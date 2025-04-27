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

// 納付書発行モーダルを開く
function openPaymentSlipModal(userId) {
    // 実際の実装では、APIを呼び出してユーザーデータを取得して表示
    // ここではデモのため、固定値を設定
    document.getElementById('payment-slip-modal').style.display = 'flex';
    
    // ユーザーIDに基づいて対象者情報を表示（本来はAPIから取得）
    if (userId === '2025001') {
        document.getElementById('payment-slip-name').value = '山田 太郎';
        document.getElementById('payment-slip-school').value = '文京第一小学校 3年1組';
    } else if (userId === '2025003') {
        document.getElementById('payment-slip-name').value = '鈴木 花子';
        document.getElementById('payment-slip-school').value = '文京第一小学校 3年2組';
    } else if (userId === '2025005') {
        document.getElementById('payment-slip-name').value = '高橋 真理';
        document.getElementById('payment-slip-school').value = '文京第二小学校 4年1組';
    } else if (userId === '2025008') {
        document.getElementById('payment-slip-name').value = '佐々木 健太';
        document.getElementById('payment-slip-school').value = '文京第三小学校 2年2組';
    } else if (userId === '2025010') {
        document.getElementById('payment-slip-name').value = '伊藤 さくら';
        document.getElementById('payment-slip-school').value = '文京第一中学校 1年3組';
    }
}

// 納付書発行モーダルを閉じる
function closePaymentSlipModal() {
    document.getElementById('payment-slip-modal').style.display = 'none';
}

// 分割納付設定モーダルを開く
function openSplitPaymentModal(userId) {
    // 実際の実装では、APIを呼び出してユーザーデータを取得して表示
    document.getElementById('split-payment-modal').style.display = 'flex';
    
    // ユーザーIDに基づいて対象者情報を表示（本来はAPIから取得）
    if (userId === '2025001') {
        document.getElementById('split-payment-name').value = '山田 太郎';
        document.getElementById('split-payment-school').value = '文京第一小学校 3年1組';
        document.getElementById('split-payment-total').value = '10,600円';
    } else if (userId === '2025003') {
        document.getElementById('split-payment-name').value = '鈴木 花子';
        document.getElementById('split-payment-school').value = '文京第一小学校 3年2組';
        document.getElementById('split-payment-total').value = '5,300円';
    } else if (userId === '2025005') {
        document.getElementById('split-payment-name').value = '高橋 真理';
        document.getElementById('split-payment-school').value = '文京第二小学校 4年1組';
        document.getElementById('split-payment-total').value = '15,900円';
    } else if (userId === '2025008') {
        document.getElementById('split-payment-name').value = '佐々木 健太';
        document.getElementById('split-payment-school').value = '文京第三小学校 2年2組';
        document.getElementById('split-payment-total').value = '10,600円';
    } else if (userId === '2025010') {
        document.getElementById('split-payment-name').value = '伊藤 さくら';
        document.getElementById('split-payment-school').value = '文京第一中学校 1年3組';
        document.getElementById('split-payment-total').value = '18,900円';
    }
}

// 分割納付設定モーダルを閉じる
function closeSplitPaymentModal() {
    document.getElementById('split-payment-modal').style.display = 'none';
}

// 履歴モーダルを開く
function openHistoryModal(userId) {
    // 実際の実装では、ユーザーの納付書発行履歴を表示するモーダルを実装
    showNotification('納付書発行履歴は準備中です');
}

// 分割詳細モーダルを開く
function openSplitDetailModal(userId) {
    // 実際の実装では、分割納付の詳細情報を表示するモーダルを実装
    showNotification('分割納付詳細は準備中です');
}

// 分割編集モーダルを開く
function openSplitEditModal(userId) {
    // 実装の簡略化のため、分割納付設定モーダルを流用
    openSplitPaymentModal(userId);
}

// 分割納付の詳細履歴を表示
function openSplitHistoryModal(userId) {
    // 実際の実装では、分割納付の履歴を表示するモーダルを実装
    showNotification('分割納付履歴は準備中です');
}

// 納付書を再印刷する
function reprintPaymentSlip(slipId) {
    showNotification('納付書番号 ' + slipId + ' を再印刷します');
}

// 納付書を無効化する
function voidPaymentSlip(slipId) {
    if (confirm('納付書番号 ' + slipId + ' を無効にしますか？')) {
        showNotification('納付書番号 ' + slipId + ' を無効にしました');
    }
}

// 納付詳細を表示する
function viewPaymentDetail(slipId) {
    showNotification('納付書詳細は準備中です');
}

// 分割納付書を印刷する
function printSplitPaymentSlip(userId) {
    showNotification(userId + ' の分割納付書を印刷します');
}

// 納付書を発行する
function issuePaymentSlip() {
    showNotification('納付書を発行しました');
    closePaymentSlipModal();
}

// 分割納付を保存して誓約書を発行する
function saveSplitPaymentAndPrint() {
    showNotification('分割納付設定を保存し、誓約書を発行します');
    closeSplitPaymentModal();
}

// 分割納付を保存する
function saveSplitPayment() {
    showNotification('分割納付設定を保存しました');
    closeSplitPaymentModal();
}

// 納付期限一括設定モーダルを開く
function openDueDateModal() {
    document.getElementById('due-date-modal').style.display = 'flex';
}

// 納付期限一括設定モーダルを閉じる
function closeDueDateModal() {
    document.getElementById('due-date-modal').style.display = 'none';
}

// 納付期限を保存する
function saveDueDate() {
    const dueDate = document.getElementById('bulk-due-date').value;
    showNotification('納付期限を ' + formatDate(dueDate) + ' に設定しました');
    closeDueDateModal();
}

// 日付をフォーマットする補助関数
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
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

// ページ読み込み時の初期化処理
document.addEventListener('DOMContentLoaded', function() {
    // 全選択チェックボックスの処理
    const selectAll = document.getElementById('select-all');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.row-select');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAll.checked;
            });
        });
    }
    
    // 分割納付書選択時の処理
    const slipTypeRadios = document.querySelectorAll('input[name="slip-type"]');
    if (slipTypeRadios.length > 0) {
        slipTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const splitSections = document.querySelectorAll('.split-payment-section');
                if (radio.checked && radio.parentElement.textContent.trim().includes('分割納付書')) {
                    splitSections.forEach(section => section.style.display = 'block');
                } else {
                    splitSections.forEach(section => section.style.display = 'none');
                }
            });
        });
    }
    
    // 納付期限設定ボタンのイベント
    const btnIssueDate = document.getElementById('btn-issue-date');
    if (btnIssueDate) {
        btnIssueDate.addEventListener('click', openDueDateModal);
    }
    
    // 分割回数変更時のイベント
    const splitCountSelect = document.getElementById('split-count');
    if (splitCountSelect) {
        splitCountSelect.addEventListener('change', function() {
            updateSplitSchedule(parseInt(splitCountSelect.value));
        });
    }
    
    // 分割方法ラジオボタンの変更時のイベント
    const splitMethodRadios = document.querySelectorAll('input[name="split-method"]');
    if (splitMethodRadios.length > 0) {
        splitMethodRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                // 実際の実装では、均等分割か任意分割かによって入力フィールドの状態を変更
                if (radio.parentElement.textContent.trim().includes('均等分割')) {
                    // 均等分割の場合は金額入力を無効にして自動計算
                    const amountInputs = document.querySelectorAll('.split-schedule .form-col:nth-child(2) input');
                    const totalAmount = document.getElementById('split-payment-total').value.replace(/[^0-9]/g, '');
                    const splitCount = parseInt(document.getElementById('split-count').value);
                    const perAmount = Math.floor(totalAmount / splitCount);
                    
                    amountInputs.forEach((input, index) => {
                        if (index < splitCount - 1) {
                            input.value = perAmount.toLocaleString() + '円';
                            input.disabled = true;
                        } else if (index === splitCount - 1) {
                            // 最後の回は端数調整
                            input.value = (parseInt(totalAmount) - perAmount * (splitCount - 1)).toLocaleString() + '円';
                            input.disabled = true;
                        } else {
                            input.value = '';
                            input.disabled = true;
                        }
                    });
                } else {
                    // 任意分割の場合は金額入力を有効にして手動入力可能に
                    const amountInputs = document.querySelectorAll('.split-schedule .form-col:nth-child(2) input');
                    amountInputs.forEach(input => {
                        input.disabled = false;
                    });
                }
            });
        });
    }
    
    // フィルターボタンのイベント
    const btnFilter = document.getElementById('btn-filter');
    if (btnFilter) {
        btnFilter.addEventListener('click', function() {
            showNotification('フィルター機能は準備中です');
        });
    }
    
    // 一括印刷ボタンのイベント
    const btnPrintAll = document.getElementById('btn-print-all');
    if (btnPrintAll) {
        btnPrintAll.addEventListener('click', function() {
            const selectedCheckboxes = document.querySelectorAll('.row-select:checked');
            if (selectedCheckboxes.length === 0) {
                showNotification('印刷対象を選択してください', 'warning');
            } else {
                showNotification('選択された ' + selectedCheckboxes.length + ' 件の納付書を印刷します');
            }
        });
    }
});

// 分割回数に応じて分割スケジュールのフォームを更新
function updateSplitSchedule(count) {
    const splitSchedule = document.querySelector('.split-schedule');
    if (!splitSchedule) return;
    
    // 現在のフォーム行をクリア
    splitSchedule.innerHTML = '';
    
    // 分割回数分の行を生成
    for (let i = 1; i <= count; i++) {
        const row = document.createElement('div');
        row.className = 'form-row';
        
        const today = new Date();
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + i, 0);
        const dateStr = nextMonth.toISOString().split('T')[0];
        
        // 総額を取得して均等分割
        const totalAmount = document.getElementById('split-payment-total').value.replace(/[^0-9]/g, '');
        const perAmount = Math.floor(totalAmount / count);
        let amount = perAmount;
        
        // 最後の回は端数調整
        if (i === count) {
            amount = parseInt(totalAmount) - perAmount * (count - 1);
        }
        
        row.innerHTML = `
            <div class="form-col">
                <label class="form-label">${i}回目</label>
                <input type="date" class="form-control" value="${dateStr}">
            </div>
            <div class="form-col">
                <label class="form-label">金額</label>
                <input type="text" class="form-control" value="${amount.toLocaleString()}円" ${document.querySelector('input[name="split-method"]:checked').parentElement.textContent.trim().includes('均等分割') ? 'disabled' : ''}>
            </div>
        `;
        
        splitSchedule.appendChild(row);
    }
}
