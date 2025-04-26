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

// 詳細モーダルを開く
function openDetailModal(id) {
    const detailModal = document.getElementById('detail-modal');
    
    // モーダルの表示
    detailModal.style.display = 'flex';
    
    // IDに応じてモーダルの内容を設定
    // 実際のシステムではAPIから対象者のデータを取得する
    if(id) {
        const userData = getUserData(id);
        if(userData) {
            document.getElementById('detail-name').value = userData.name;
            document.getElementById('detail-school').value = `${userData.school} ${userData.grade}${userData.class}組`;
            
            // その他の情報を設定
            // 実際のシステムでは口座情報や請求情報など詳細データを表示
        }
    }
}

// 詳細モーダルを閉じる
function closeDetailModal() {
    document.getElementById('detail-modal').style.display = 'none';
}

// 金融機関別詳細モーダルを開く（サンプル）
function openBankDetailModal(bankCode) {
    // 実際のシステムでは金融機関詳細データを取得して表示
    alert(`金融機関コード: ${bankCode} の詳細情報を表示します`);
}

// 特例情報詳細モーダルを開く（サンプル）
function openSpecialDetailModal(specialType) {
    // 実際のシステムでは特例情報の詳細データを取得して表示
    alert(`特例情報: ${specialType} の詳細情報を表示します`);
}

// 口座振替データ作成モーダルを開く
function generateBankTransferData() {
    document.getElementById('bank-transfer-modal').style.display = 'flex';
}

// 口座振替データ作成モーダルを閉じる
function closeBankTransferModal() {
    document.getElementById('bank-transfer-modal').style.display = 'none';
}

// 口座振替ファイルを作成する処理
function createBankTransferFile() {
    // 実際のシステムではAPIに口座振替データ作成処理を送信
    
    // 必要なパラメータを取得
    const period = document.getElementById('transfer-period').value;
    const date = document.getElementById('transfer-date').value;
    const format = document.getElementById('transfer-format').value;
    
    // モーダルを閉じる
    closeBankTransferModal();
    
    // 通知を表示
    showNotification('口座振替データが正常に作成されました', 'success');
}

// CSVデータ出力モーダルを開く
function exportCSVData() {
    document.getElementById('csv-export-modal').style.display = 'flex';
}

// CSVデータ出力モーダルを閉じる
function closeCSVExportModal() {
    document.getElementById('csv-export-modal').style.display = 'none';
}

// CSVファイルを出力する処理
function exportCSVFile() {
    // 実際のシステムではAPIにCSVデータ出力処理を送信
    
    // 必要なパラメータを取得
    const type = document.getElementById('csv-type').value;
    const period = document.getElementById('csv-period').value;
    const format = document.getElementById('csv-format').value;
    
    // モーダルを閉じる
    closeCSVExportModal();
    
    // 通知を表示
    showNotification('CSVデータが正常に出力されました', 'success');
}

// 複数月選択処理
function generateMultipleMonthData() {
    // 実際のシステムでは選択された月のデータを取得して処理
    
    // 選択された月を確認
    const selectedMonths = [];
    if(document.getElementById('month-04').checked) selectedMonths.push('2025年4月');
    if(document.getElementById('month-05').checked) selectedMonths.push('2025年5月');
    if(document.getElementById('month-06').checked) selectedMonths.push('2025年6月');
    if(document.getElementById('month-07').checked) selectedMonths.push('2025年7月');
    
    if(selectedMonths.length === 0) {
        showNotification('対象月が選択されていません', 'warning');
        return;
    }
    
    // 通知を表示
    showNotification(`選択された月(${selectedMonths.join(', ')})の口座振替データを作成しました`, 'success');
}

// 個人通知書作成処理
function generateIndividualNotice() {
    // 実際のシステムではAPIに個人通知書作成処理を送信
    
    // モーダルを閉じる
    closeDetailModal();
    
    // 通知を表示
    showNotification('納入通知書が正常に作成されました', 'success');
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
            amount: 5600,
            paymentMethod: '口座振替',
            bank: '三菱UFJ銀行 文京支店',
            accountNo: '*****1234',
            special: 'none',
            status: '請求済'
        },
        2025002: {
            name: '佐藤 一郎',
            school: '文京第一小学校',
            grade: '3年',
            class: '1',
            amount: 5040,
            paymentMethod: '口座振替',
            bank: '三井住友銀行 文京支店',
            accountNo: '*****5678',
            special: 'none',
            status: '請求済'
        },
        2025003: {
            name: '鈴木 花子',
            school: '文京第一小学校',
            grade: '3年',
            class: '2',
            amount: 2800,
            paymentMethod: '納付書',
            bank: '',
            accountNo: '',
            special: '就学援助',
            status: '未請求'
        },
        2025004: {
            name: '田中 次郎',
            school: '文京第一小学校',
            grade: '3年',
            class: '2',
            amount: 5600,
            paymentMethod: '口座振替',
            bank: 'みずほ銀行 文京支店',
            accountNo: '*****9012',
            special: 'none',
            status: '請求済'
        },
        2025005: {
            name: '高橋 真理',
            school: '文京第二小学校',
            grade: '4年',
            class: '1',
            amount: 0,
            paymentMethod: '納付書',
            bank: '',
            accountNo: '',
            special: '生活保護',
            status: '対象外'
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
    
    // 月選択のアクティブ状態を設定
    const monthItems = document.querySelectorAll('.month-item');
    if(monthItems.length > 0) {
        monthItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if(checkbox) {
                checkbox.addEventListener('change', function() {
                    if(this.checked) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }
});
