// タブ切り替え関数
function switchTab(tabId) {
    // すべてのタブコンテンツを非表示にする
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // クリックされたタブに対応するコンテンツを表示する
    document.getElementById(tabId).classList.add('active');
    
    // タブのアクティブ状態を切り替える
    const tabs = document.querySelectorAll('.tabs .tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if(tab.getAttribute('onclick').includes(tabId)) {
            tab.classList.add('active');
        }
    });
}

// 調定額編集モーダルを開く
function openEditModal(id) {
    const editModal = document.getElementById('edit-modal');
    
    // モーダルの表示
    editModal.style.display = 'flex';
    
    // IDに応じてモーダルの内容を設定
    // 実際のシステムではAPIから対象者のデータを取得する
    if(id) {
        const userData = getUserData(id);
        if(userData) {
            document.getElementById('edit-name').value = userData.name;
            document.getElementById('edit-school').value = `${userData.school} ${userData.grade}${userData.class}組`;
            document.getElementById('edit-eating-days').value = userData.eatingDays;
            document.getElementById('edit-absent-days').value = userData.absentDays;
            document.getElementById('edit-price').value = userData.price;
            document.getElementById('edit-exemption').value = userData.exemption || 'none';
            document.getElementById('edit-total-amount').value = userData.totalAmount;
            
            // 特例情報がある場合、減免額フィールドを表示
            if(userData.exemption && userData.exemption !== 'none') {
                document.getElementById('exemption-detail').style.display = 'block';
                document.getElementById('edit-exemption-amount').value = userData.exemptionAmount || 0;
            } else {
                document.getElementById('exemption-detail').style.display = 'none';
            }
        }
    }
}

// 調定額編集モーダルを閉じる
function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// 編集内容を保存
function saveEdit() {
    // 実際のシステムではAPIに保存処理を送信
    
    // 各フィールドから値を取得
    const eatingDays = parseInt(document.getElementById('edit-eating-days').value) || 0;
    const absentDays = parseInt(document.getElementById('edit-absent-days').value) || 0;
    const price = parseInt(document.getElementById('edit-price').value) || 0;
    const exemption = document.getElementById('edit-exemption').value;
    const exemptionAmount = parseInt(document.getElementById('edit-exemption-amount').value) || 0;
    
    // 調定額の計算
    let totalAmount = eatingDays * price;
    
    // 特例情報がある場合は減免額を差し引く
    if(exemption !== 'none') {
        totalAmount -= exemptionAmount;
        // 負の金額にならないように調整
        if(totalAmount < 0) totalAmount = 0;
    }
    
    // 計算結果を表示
    document.getElementById('edit-total-amount').value = totalAmount;
    
    // モーダルを閉じる
    closeEditModal();
    
    // 通知を表示
    showNotification('調定額が正常に更新されました', 'success');
}

// 特例情報選択時の処理
document.addEventListener('DOMContentLoaded', function() {
    const exemptionSelect = document.getElementById('edit-exemption');
    if(exemptionSelect) {
        exemptionSelect.addEventListener('change', function() {
            const exemptionDetail = document.getElementById('exemption-detail');
            if(this.value !== 'none') {
                exemptionDetail.style.display = 'block';
            } else {
                exemptionDetail.style.display = 'none';
                document.getElementById('edit-exemption-amount').value = 0;
            }
            
            // 調定額の再計算
            const eatingDays = parseInt(document.getElementById('edit-eating-days').value) || 0;
            const price = parseInt(document.getElementById('edit-price').value) || 0;
            const exemptionAmount = parseInt(document.getElementById('edit-exemption-amount').value) || 0;
            
            let totalAmount = eatingDays * price;
            if(this.value !== 'none') {
                totalAmount -= exemptionAmount;
                if(totalAmount < 0) totalAmount = 0;
            }
            
            document.getElementById('edit-total-amount').value = totalAmount;
        });
    }
    
    // 喫食日数・欠食日数変更時の処理
    const eatingDaysInput = document.getElementById('edit-eating-days');
    const absentDaysInput = document.getElementById('edit-absent-days');
    const priceInput = document.getElementById('edit-price');
    const exemptionAmountInput = document.getElementById('edit-exemption-amount');
    
    [eatingDaysInput, absentDaysInput, priceInput, exemptionAmountInput].forEach(input => {
        if(input) {
            input.addEventListener('change', function() {
                const eatingDays = parseInt(eatingDaysInput.value) || 0;
                const price = parseInt(priceInput.value) || 0;
                const exemption = document.getElementById('edit-exemption').value;
                const exemptionAmount = parseInt(exemptionAmountInput.value) || 0;
                
                let totalAmount = eatingDays * price;
                if(exemption !== 'none') {
                    totalAmount -= exemptionAmount;
                    if(totalAmount < 0) totalAmount = 0;
                }
                
                document.getElementById('edit-total-amount').value = totalAmount;
            });
        }
    });
    
    // 事前確認モーダルの対象選択変更時処理
    const previewTargetSelect = document.getElementById('preview-target');
    if(previewTargetSelect) {
        previewTargetSelect.addEventListener('change', function() {
            const schoolContainer = document.getElementById('preview-school-container');
            if(this.value === 'school' || this.value === 'grade' || this.value === 'class') {
                schoolContainer.style.display = 'block';
            } else {
                schoolContainer.style.display = 'none';
            }
        });
    }
    
    // 調定確定モーダルの対象選択変更時処理
    const confirmTargetSelect = document.getElementById('confirm-target');
    if(confirmTargetSelect) {
        confirmTargetSelect.addEventListener('change', function() {
            const detailContainer = document.getElementById('confirm-detail-container');
            if(this.value !== 'all') {
                detailContainer.style.display = 'block';
                
                // 選択肢を更新
                const detailSelect = document.getElementById('confirm-detail');
                detailSelect.innerHTML = '';
                
                if(this.value === 'school') {
                    const schools = ['文京第一小学校', '文京第二小学校', '文京第三小学校', '文京第一中学校'];
                    schools.forEach(school => {
                        const option = document.createElement('option');
                        option.textContent = school;
                        detailSelect.appendChild(option);
                    });
                } else if(this.value === 'grade') {
                    const school = document.createElement('select');
                    school.className = 'form-select';
                    school.innerHTML = '<option>文京第一小学校</option><option>文京第二小学校</option><option>文京第三小学校</option><option>文京第一中学校</option>';
                    
                    const grade = document.createElement('select');
                    grade.className = 'form-select';
                    grade.style.marginTop = '0.5rem';
                    grade.innerHTML = '<option>1年</option><option>2年</option><option>3年</option><option>4年</option><option>5年</option><option>6年</option>';
                    
                    detailContainer.innerHTML = '';
                    detailContainer.appendChild(school);
                    detailContainer.appendChild(grade);
                } else if(this.value === 'class') {
                    const school = document.createElement('select');
                    school.className = 'form-select';
                    school.innerHTML = '<option>文京第一小学校</option><option>文京第二小学校</option><option>文京第三小学校</option><option>文京第一中学校</option>';
                    
                    const grade = document.createElement('select');
                    grade.className = 'form-select';
                    grade.style.marginTop = '0.5rem';
                    grade.innerHTML = '<option>1年</option><option>2年</option><option>3年</option><option>4年</option><option>5年</option><option>6年</option>';
                    
                    const classNum = document.createElement('select');
                    classNum.className = 'form-select';
                    classNum.style.marginTop = '0.5rem';
                    classNum.innerHTML = '<option>1組</option><option>2組</option><option>3組</option>';
                    
                    detailContainer.innerHTML = '';
                    detailContainer.appendChild(school);
                    detailContainer.appendChild(grade);
                    detailContainer.appendChild(classNum);
                } else if(this.value === 'individual') {
                    const searchInput = document.createElement('input');
                    searchInput.type = 'text';
                    searchInput.className = 'form-control';
                    searchInput.placeholder = '名前で検索';
                    
                    const searchResults = document.createElement('div');
                    searchResults.style.marginTop = '0.5rem';
                    searchResults.style.maxHeight = '150px';
                    searchResults.style.overflowY = 'auto';
                    searchResults.style.border = '1px solid #e0e0e0';
                    searchResults.style.borderRadius = '4px';
                    searchResults.style.padding = '0.5rem';
                    
                    // サンプルデータ
                    searchResults.innerHTML = `
                        <div style="padding: 0.25rem; cursor: pointer;">山田 太郎（3年1組）</div>
                        <div style="padding: 0.25rem; cursor: pointer;">佐藤 一郎（3年1組）</div>
                        <div style="padding: 0.25rem; cursor: pointer;">鈴木 花子（3年2組）</div>
                        <div style="padding: 0.25rem; cursor: pointer;">田中 次郎（3年2組）</div>
                        <div style="padding: 0.25rem; cursor: pointer;">高橋 真理（4年1組）</div>
                    `;
                    
                    detailContainer.innerHTML = '';
                    detailContainer.appendChild(searchInput);
                    detailContainer.appendChild(searchResults);
                }
            } else {
                detailContainer.style.display = 'none';
            }
        });
    }
    
    // 確定チェックボックスの処理
    const confirmCheck = document.getElementById('confirm-check');
    if(confirmCheck) {
        confirmCheck.addEventListener('change', function() {
            const confirmButton = document.getElementById('confirm-button');
            confirmButton.disabled = !this.checked;
        });
    }
});

// 事前確認モーダルを開く
function previewAssessment() {
    document.getElementById('preview-modal').style.display = 'flex';
}

// 事前確認モーダルを閉じる
function closePreviewModal() {
    document.getElementById('preview-modal').style.display = 'none';
}

// 調定確定モーダルを開く
function confirmAssessment() {
    document.getElementById('confirm-modal').style.display = 'flex';
}

// 調定確定モーダルを閉じる
function closeConfirmModal() {
    document.getElementById('confirm-modal').style.display = 'none';
}

// クラス詳細モーダルを開く（サンプル）
function openClassDetailModal(school, classInfo) {
    // 実際のシステムではクラス詳細データを取得して表示
    alert(`${school} ${classInfo} の詳細情報を表示します`);
}

// 学年詳細モーダルを開く（サンプル）
function openGradeDetailModal(school, grade) {
    // 実際のシステムでは学年詳細データを取得して表示
    alert(`${school} ${grade} の詳細情報を表示します`);
}

// 学校詳細モーダルを開く（サンプル）
function openSchoolDetailModal(school) {
    // 実際のシステムでは学校詳細データを取得して表示
    alert(`${school} の詳細情報を表示します`);
}

// 通知を表示する関数
function showNotification(message, type = 'success') {
    const notifications = document.querySelector('.notifications');
    
    // 通知要素を作成
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // 通知内容を設定
    notification.innerHTML = `
        <div class="notification-icon notification-${type}">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">操作完了</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // 通知を表示
    notifications.appendChild(notification);
    
    // 通知を閉じるボタンのイベント設定
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
    });
    
    // 5秒後に自動的に閉じる
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ユーザーデータを取得する関数（サンプル）
function getUserData(id) {
    // サンプルデータ
    const usersData = {
        2025001: {
            name: '山田 太郎',
            school: '文京第一小学校',
            grade: '3年',
            class: '1',
            eatingDays: 20,
            absentDays: 0,
            price: 280,
            exemption: 'none',
            exemptionAmount: 0,
            totalAmount: 5600
        },
        2025002: {
            name: '佐藤 一郎',
            school: '文京第一小学校',
            grade: '3年',
            class: '1',
            eatingDays: 18,
            absentDays: 2,
            price: 280,
            exemption: 'none',
            exemptionAmount: 0,
            totalAmount: 5040
        },
        2025003: {
            name: '鈴木 花子',
            school: '文京第一小学校',
            grade: '3年',
            class: '2',
            eatingDays: 15,
            absentDays: 5,
            price: 280,
            exemption: 'subsidy',
            exemptionAmount: 1400,
            totalAmount: 4200 - 1400
        },
        2025004: {
            name: '田中 次郎',
            school: '文京第一小学校',
            grade: '3年',
            class: '2',
            eatingDays: 20,
            absentDays: 0,
            price: 280,
            exemption: 'none',
            exemptionAmount: 0,
            totalAmount: 5600
        },
        2025005: {
            name: '高橋 真理',
            school: '文京第二小学校',
            grade: '4年',
            class: '1',
            eatingDays: 17,
            absentDays: 3,
            price: 280,
            exemption: 'welfare',
            exemptionAmount: 4760,
            totalAmount: 0
        }
    };
    
    return usersData[id];
}

// 日付ナビゲータの処理
document.addEventListener('DOMContentLoaded', function() {
    const prevDateBtn = document.querySelector('.date-navigator .fa-angle-left').closest('button');
    const nextDateBtn = document.querySelector('.date-navigator .fa-angle-right').closest('button');
    const calendarBtn = document.querySelector('.date-navigator .fa-calendar-alt').closest('button');
    const currentDateEl = document.querySelector('.current-date');
    
    if(prevDateBtn && nextDateBtn && calendarBtn && currentDateEl) {
        // 現在の日付テキストを取得
        let currentText = currentDateEl.textContent;
        
        prevDateBtn.addEventListener('click', function() {
            // 実際のシステムでは前月のデータを取得
            if(currentText === '2025年4月') {
                currentText = '2025年3月';
            } else if(currentText === '2025年5月') {
                currentText = '2025年4月';
            } else if(currentText === '2025年3月') {
                currentText = '2025年2月';
            }
            
            currentDateEl.textContent = currentText;
            showNotification(`${currentText}のデータを表示しています`);
        });
        
        nextDateBtn.addEventListener('click', function() {
            // 実際のシステムでは次月のデータを取得
            if(currentText === '2025年4月') {
                currentText = '2025年5月';
            } else if(currentText === '2025年3月') {
                currentText = '2025年4月';
            } else if(currentText === '2025年2月') {
                currentText = '2025年3月';
            }
            
            currentDateEl.textContent = currentText;
            showNotification(`${currentText}のデータを表示しています`);
        });
        
        calendarBtn.addEventListener('click', function() {
            // 実際のシステムではカレンダーモーダルを表示
            alert('月選択カレンダーは実装中です');
        });
    }
});
