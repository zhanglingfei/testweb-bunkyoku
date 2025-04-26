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

// 期間設定モーダルを開く
function openPeriodModal() {
    document.getElementById('period-modal').style.display = 'flex';
}

// 期間設定モーダルを閉じる
function closePeriodModal() {
    document.getElementById('period-modal').style.display = 'none';
}

// 一括編集モーダルを開く
function openBulkEditModal() {
    document.getElementById('bulk-edit-modal').style.display = 'flex';
}

// 一括編集モーダルを閉じる
function closeBulkEditModal() {
    document.getElementById('bulk-edit-modal').style.display = 'none';
}

// 行事設定モーダルを開く
function openEventModal() {
    document.getElementById('event-modal').style.display = 'flex';
}

// 行事設定モーダルを閉じる
function closeEventModal() {
    document.getElementById('event-modal').style.display = 'none';
}

// 個別編集モーダルを開く
function openEditModal() {
    // ここでは期間設定モーダルを流用
    openPeriodModal();
}

// 通知を閉じる処理
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.notification-close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.notification').style.display = 'none';
        });
    });

    // 喫食状況の選択変更時の処理
    document.querySelectorAll('.eating-status').forEach(select => {
        select.addEventListener('change', function() {
            // 変更時の処理をここに記述
            // 例: APIに変更を送信、色の変更など
            showNotification('喫食状況が変更されました');
        });
    });

    // 日付ナビゲータの処理
    const prevDateBtn = document.querySelector('.date-navigator .fa-angle-left').closest('button');
    const nextDateBtn = document.querySelector('.date-navigator .fa-angle-right').closest('button');
    const calendarBtn = document.querySelector('.date-navigator .fa-calendar-alt').closest('button');
    
    prevDateBtn.addEventListener('click', function() {
        // 前日の処理
        const dateText = document.querySelector('.current-date');
        // 実際の日付操作はサーバーと連携して行う
        dateText.textContent = '2025年4月25日';
        // データの再読み込みなどの処理
        showNotification('前日のデータを表示しています');
    });
    
    nextDateBtn.addEventListener('click', function() {
        // 翌日の処理
        const dateText = document.querySelector('.current-date');
        // 実際の日付操作はサーバーと連携して行う
        dateText.textContent = '2025年4月27日';
        // データの再読み込みなどの処理
        showNotification('翌日のデータを表示しています');
    });
    
    calendarBtn.addEventListener('click', function() {
        // カレンダー表示の処理
        // 実際にはカレンダーモーダルを表示する
        alert('カレンダー選択は実装中です');
    });

    // 集計タブのための処理
    if (document.getElementById('tab-summary')) {
        const summaryControls = document.querySelector('.summary-controls .btn-primary');
        if (summaryControls) {
            summaryControls.addEventListener('click', function() {
                // 集計処理
                showNotification('集計を実行しました');
            });
        }
    }
});

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

// フィルタリング処理（実際の実装はバックエンドと連携）
document.addEventListener('DOMContentLoaded', function() {
    const schoolSelect = document.getElementById('school-select');
    const gradeSelect = document.getElementById('grade-select');
    const classSelect = document.getElementById('class-select');
    const dateSelect = document.getElementById('date-select');
    
    if (schoolSelect && gradeSelect && classSelect && dateSelect) {
        // 選択変更時のイベント設定
        [schoolSelect, gradeSelect, classSelect, dateSelect].forEach(select => {
            select.addEventListener('change', function() {
                // 検索条件変更時の処理
                // 実際にはAPIリクエストなどでデータを更新
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
