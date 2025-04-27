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

// 返金処理モーダルを開く
function openRefundModal(userId) {
    // ユーザーIDに基づいて情報を設定（実際にはAPIから取得）
    if (userId === 2025001) {
        document.getElementById('refund-user-name').value = '山田 太郎';
        document.getElementById('refund-user-school').value = '文京第一小学校 3年1組';
        document.getElementById('refund-amount').value = '¥2,500';
    } else if (userId === 2025003) {
        document.getElementById('refund-user-name').value = '鈴木 花子';
        document.getElementById('refund-user-school').value = '文京第一小学校 3年2組';
        document.getElementById('refund-amount').value = '¥1,800';
    } else if (userId === 2025008) {
        document.getElementById('refund-user-name').value = '佐々木 健太';
        document.getElementById('refund-user-school').value = '文京第三小学校 5年2組';
        document.getElementById('refund-amount').value = '¥4,200';
    }
    
    document.getElementById('refund-modal').style.display = 'flex';
}

// 返金処理モーダルを閉じる
function closeRefundModal() {
    document.getElementById('refund-modal').style.display = 'none';
}

// 一括返金モーダルを開く
function openBulkRefundModal() {
    document.getElementById('bulk-refund-modal').style.display = 'flex';
}

// 一括返金モーダルを閉じる
function closeBulkRefundModal() {
    document.getElementById('bulk-refund-modal').style.display = 'none';
}

// 返金予定者一覧モーダルを開く
function openRefundListModal() {
    document.getElementById('refund-list-modal').style.display = 'flex';
}

// 返金予定者一覧モーダルを閉じる
function closeRefundListModal() {
    document.getElementById('refund-list-modal').style.display = 'none';
}

// 返金処理を実行
function processRefund() {
    const userName = document.getElementById('refund-user-name').value;
    const refundMethod = document.getElementById('refund-method').value;
    const refundReason = document.getElementById('refund-reason-single').value;
    
    // ここで実際にはAPIリクエストを送信する
    
    // 処理成功の通知
    showNotification(`${userName}さんへの返金処理が完了しました。`, 'success');
    
    // モーダルを閉じる
    closeRefundModal();
    
    // 表示を更新（実際にはAPIからデータを再取得）
    setTimeout(() => {
        // ここでは簡易的にページをリロード
        // location.reload();
    }, 1000);
}

// 一括返金の対象者計算
function calculateBatchRefund() {
    const targetType = document.getElementById('refund-target-type').value;
    const targetValue = document.getElementById('refund-target-value').value;
    const reason = document.getElementById('refund-reason').value;
    
    // 実際にはAPIから対象者リストを取得
    // ここではデモ用にデータを生成
    
    // 結果エリアを表示
    document.getElementById('batch-result').style.display = 'block';
    
    // 対象者リストをクリア
    const listElement = document.getElementById('batch-refund-list');
    listElement.innerHTML = '';
    
    // テストデータを追加
    const dummyData = [
        { id: '2025001', name: '山田 太郎', school: '文京第一小学校', class: '3年1組', amount: '¥2,500', method: '口座振込' },
        { id: '2025002', name: '佐藤 一郎', school: '文京第一小学校', class: '3年1組', amount: '¥2,500', method: '口座振込' },
        { id: '2025003', name: '鈴木 花子', school: '文京第一小学校', class: '3年2組', amount: '¥1,800', method: '口座振込' },
        { id: '2025004', name: '田中 次郎', school: '文京第一小学校', class: '3年2組', amount: '¥1,800', method: '口座振込' }
    ];
    
    dummyData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.school}</td>
            <td>${item.class}</td>
            <td>${item.amount}</td>
            <td>${item.method}</td>
        `;
        listElement.appendChild(row);
    });
    
    // スクロールを結果エリアまで移動
    document.getElementById('batch-result').scrollIntoView({ behavior: 'smooth' });
}

// 一括返金処理を実行
function processBatchRefund() {
    // ここで実際にはAPIリクエストを送信する
    
    // 処理成功の通知
    showNotification('一括返金処理が完了しました。', 'success');
    
    // 表示を更新（実際にはAPIからデータを再取得）
    setTimeout(() => {
        // タブを個人返金に切り替え
        switchTab('tab-individual');
        // 結果エリアを非表示
        document.getElementById('batch-result').style.display = 'none';
    }, 1000);
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

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 通知を閉じる処理
    document.querySelectorAll('.notification-close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.notification').style.display = 'none';
        });
    });
    
    // 日付フィールドの初期値設定
    const today = new Date();
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    document.getElementById('history-start-date').value = formatDate(oneMonthAgo);
    document.getElementById('history-end-date').value = formatDate(today);
    
    // フィルタリング処理
    const schoolSelect = document.getElementById('school-select');
    const gradeSelect = document.getElementById('grade-select');
    const classSelect = document.getElementById('class-select');
    
    if (schoolSelect && gradeSelect && classSelect) {
        // 選択変更時のイベント設定
        [schoolSelect, gradeSelect, classSelect].forEach(select => {
            select.addEventListener('change', function() {
                // フィルタリング処理（実際にはAPIリクエストなど）
                showNotification('検索条件が変更されました。データを更新中...');
            });
        });
    }
    
    // 検索フィールドの処理
    const searchField = document.querySelector('.search-field input');
    if (searchField) {
        searchField.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                // Enter押下時の検索処理
                showNotification(`"${searchField.value}" で検索しています...`);
            }
        });
    }
});
