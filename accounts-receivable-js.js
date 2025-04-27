// 未収金管理画面の JavaScript

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
    document.getElementById('detail-modal').style.display = 'flex';
    // 本来はIDを元にAPIからデータを取得して表示する
    console.log('詳細を表示: ID=' + id);
}

// 詳細モーダルを閉じる
function closeDetailModal() {
    document.getElementById('detail-modal').style.display = 'none';
}

// 分納計画モーダルを開く
function openPaymentPlanModal(id) {
    document.getElementById('payment-plan-modal').style.display = 'flex';
    // 本来はIDを元にAPIからデータを取得して表示する
    console.log('分納計画を表示/設定: ID=' + id);
}

// 分納計画モーダルを閉じる
function closePaymentPlanModal() {
    document.getElementById('payment-plan-modal').style.display = 'none';
}

// 通知作成モーダルを開く
function openNoticeModal(id) {
    document.getElementById('notice-modal').style.display = 'flex';
    // 本来はIDを元にAPIからデータを取得して表示する
    console.log('通知作成を開始: ID=' + id);
}

// 通知作成モーダルを閉じる
function closeNoticeModal() {
    document.getElementById('notice-modal').style.display = 'none';
}

// 時効中断モーダルを開く
function openStatuteInterruptModal(id) {
    document.getElementById('statute-interrupt-modal').style.display = 'flex';
    // 本来はIDを元にAPIからデータを取得して表示する
    console.log('時効中断を登録: ID=' + id);
}

// 時効中断モーダルを閉じる
function closeStatuteInterruptModal() {
    document.getElementById('statute-interrupt-modal').style.display = 'none';
}

// 不納欠損処理モーダルを開く
function openBadDebtModal() {
    document.getElementById('bad-debt-modal').style.display = 'flex';
    // 本来はAPIから時効対象データを取得して表示する
    console.log('不納欠損処理を開始');
}

// 不納欠損処理モーダルを閉じる
function closeBadDebtModal() {
    document.getElementById('bad-debt-modal').style.display = 'none';
}

// 一括通知モーダルを開く（実装予定）
function openBatchNoticeModal() {
    // 実装予定
    showNotification('一括通知機能は開発中です', 'warning');
}

// 時効管理モーダルを開く（実装予定）
function openStatuteModal() {
    // 実装予定
    showNotification('時効管理機能は開発中です', 'warning');
}

// 分納回数変更時の処理
function updateInstallmentTable() {
    const count = document.getElementById('installment-count').value.replace(/[^0-9]/g, '');
    const installmentCount = parseInt(count, 10);
    const totalAmount = 13800; // 本来はAPIから取得した総額

    const installmentTable = document.getElementById('installment-table');
    if (!installmentTable) return;
    
    // テーブルをクリア
    installmentTable.innerHTML = '';
    
    // 均等分割の場合の1回あたりの金額（最終回は端数調整）
    const baseAmount = Math.floor(totalAmount / installmentCount);
    let remainder = totalAmount - (baseAmount * installmentCount);
    
    // 初回支払日を取得（本来はフォームから取得）
    const startDateInput = document.querySelector('#payment-plan-modal input[type="date"]');
    let startDate = new Date();
    if (startDateInput && startDateInput.value) {
        startDate = new Date(startDateInput.value);
    }
    
    // 分納回数分の行を生成
    for (let i = 0; i < installmentCount; i++) {
        // 支払日を計算（1ヶ月ずつ増やす）
        const paymentDate = new Date(startDate);
        paymentDate.setMonth(paymentDate.getMonth() + i);
        
        // 日本語の月日表示用
        const year = paymentDate.getFullYear();
        const month = paymentDate.getMonth() + 1;
        const day = paymentDate.getDate();
        const dateStr = `${year}年${month}月${day}日`;
        
        // 金額（最終回は端数調整）
        let amount = baseAmount;
        if (i === installmentCount - 1) {
            amount += remainder;
        }
        
        // 行を作成
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>第${i+1}回</td>
            <td>${dateStr}</td>
            <td><input type="number" class="form-control" value="${amount}"></td>
        `;
        
        installmentTable.appendChild(row);
    }
}

// 遅延損害金計算
function calculateDelayedAmount() {
    // 遅延損害金計算のためのパラメータを取得
    const startDateInput = document.querySelector('.delayed-amount-calculator input[type="date"]:nth-of-type(1)');
    const endDateInput = document.querySelector('.delayed-amount-calculator input[type="date"]:nth-of-type(2)');
    const rateInput = document.querySelector('.delayed-amount-calculator input[type="number"]');
    
    if (!startDateInput || !endDateInput || !rateInput) return;
    
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
    const rate = parseFloat(rateInput.value) / 100; // パーセント表記から小数へ
    
    // 日数の差を計算
    const dayDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    // 未納金額（実際はAPIから取得）
    const amount = 13800;
    
    // 遅延損害金の計算: 元金 × 利率 × 日数 ÷ 365
    const delayedAmount = Math.floor(amount * rate * dayDiff / 365);
    
    // 結果を表示
    const resultElement = document.querySelector('.calculator-result');
    if (resultElement) {
        resultElement.textContent = `遅延損害金：¥${delayedAmount.toLocaleString()}`;
    }
}

// 通知を表示する関数
function showNotification(message, type = 'success') {
    const notifications = document.querySelector('.notifications');
    if (!notifications) {
        // 通知コンテナがなければ作成
        const notificationsDiv = document.createElement('div');
        notificationsDiv.className = 'notifications';
        document.body.appendChild(notificationsDiv);
    }
    
    // 通知要素を作成
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // 通知内容を設定
    notification.innerHTML = `
        <div class="notification-icon notification-${type}">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">通知</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // 通知を表示
    const notificationsContainer = document.querySelector('.notifications');
    notificationsContainer.appendChild(notification);
    
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

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', function() {
    // 全選択チェックボックスの処理
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('input[name="selected[]"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
    }
    
    // 時効欠損処理の全選択チェックボックスの処理
    const selectAllTimeLimitCheckbox = document.getElementById('select-all-time-limit');
    if (selectAllTimeLimitCheckbox) {
        selectAllTimeLimitCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('#bad-debt-modal tbody input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllTimeLimitCheckbox.checked;
            });
        });
    }
    
    // 分納回数選択の変更イベント
    const installmentCountSelect = document.getElementById('installment-count');
    if (installmentCountSelect) {
        installmentCountSelect.addEventListener('change', updateInstallmentTable);
    }
    
    // 遅延損害金計算ボタンのイベント
    const calculateDelayButton = document.querySelector('.delayed-amount-calculator .btn-primary');
    if (calculateDelayButton) {
        calculateDelayButton.addEventListener('click', calculateDelayedAmount);
    }
    
    // 検索ボタンのイベント
    const searchButton = document.querySelector('.filter-section .btn-primary');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            showNotification('検索条件に一致するデータを表示しています', 'info');
            // 本来はAPIリクエストを行い、結果を表示
        });
    }
    
    // 分納計画保存ボタンのイベント
    const savePaymentPlanButton = document.querySelector('#payment-plan-modal .btn-success');
    if (savePaymentPlanButton) {
        savePaymentPlanButton.addEventListener('click', function() {
            showNotification('分納計画を保存しました', 'success');
            closePaymentPlanModal();
            // 本来はAPIリクエストを行い、保存処理
        });
    }
    
    // 分納誓約書作成ボタンのイベント
    const createPaymentPlanDocButton = document.querySelector('#payment-plan-modal .btn-primary');
    if (createPaymentPlanDocButton) {
        createPaymentPlanDocButton.addEventListener('click', function() {
            showNotification('分納誓約書を生成しました', 'success');
            // 本来はAPIリクエストを行い、PDFを生成
        });
    }
    
    // 通知作成ボタンのイベント
    const createNoticeButton = document.querySelector('#notice-modal .btn-success');
    if (createNoticeButton) {
        createNoticeButton.addEventListener('click', function() {
            showNotification('通知を作成しました', 'success');
            closeNoticeModal();
            // 本来はAPIリクエストを行い、通知を作成
        });
    }
    
    // 通知プレビューボタンのイベント
    const previewNoticeButton = document.querySelector('#notice-modal .btn-primary');
    if (previewNoticeButton) {
        previewNoticeButton.addEventListener('click', function() {
            showNotification('プレビューを表示しています', 'info');
            // 本来はプレビュー用ウィンドウを開く
        });
    }
    
    // 時効中断登録ボタンのイベント
    const registerStatuteInterruptButton = document.querySelector('#statute-interrupt-modal .btn-success');
    if (registerStatuteInterruptButton) {
        registerStatuteInterruptButton.addEventListener('click', function() {
            showNotification('時効中断情報を登録しました', 'success');
            closeStatuteInterruptModal();
            // 本来はAPIリクエストを行い、時効中断情報を登録
        });
    }
    
    // 不納欠損処理実行ボタンのイベント
    const executeBadDebtButton = document.querySelector('#bad-debt-modal .btn-danger');
    if (executeBadDebtButton) {
        executeBadDebtButton.addEventListener('click', function() {
            showNotification('不納欠損処理を実行しました', 'success');
            closeBadDebtModal();
            // 本来はAPIリクエストを行い、不納欠損処理を実行
        });
    }
    
    // エクスポートボタンのイベント
    const exportButton = document.querySelector('.action-box .btn-success');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            showNotification('データをエクスポートしています', 'info');
            // 本来はAPIリクエストを行い、CSVなどを生成
        });
    }
});