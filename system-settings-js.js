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

// ユーザーモーダルを開く
function openUserModal() {
    document.getElementById('user-modal').style.display = 'flex';
}

// ユーザーモーダルを閉じる
function closeUserModal() {
    document.getElementById('user-modal').style.display = 'none';
}

// ユーザー編集モーダルを開く
function openUserEditModal() {
    // ここではユーザーモーダルを流用
    openUserModal();
}

// 学校モーダルを開く
function openSchoolModal() {
    document.getElementById('school-modal').style.display = 'flex';
}

// 学校モーダルを閉じる
function closeSchoolModal() {
    document.getElementById('school-modal').style.display = 'none';
}

// 学校編集モーダルを開く
function openSchoolEditModal() {
    // ここでは学校モーダルを流用
    openSchoolModal();
}

// 金融機関モーダルを開く
function openBankModal() {
    document.getElementById('bank-modal').style.display = 'flex';
}

// 金融機関モーダルを閉じる
function closeBankModal() {
    document.getElementById('bank-modal').style.display = 'none';
}

// 金融機関編集モーダルを開く
function openBankEditModal() {
    // ここでは金融機関モーダルを流用
    openBankModal();
}

// ログ詳細モーダルを開く
function openLogDetailModal() {
    document.getElementById('log-detail-modal').style.display = 'flex';
}

// ログ詳細モーダルを閉じる
function closeLogDetailModal() {
    document.getElementById('log-detail-modal').style.display = 'none';
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

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', function() {
    // 通知を閉じる処理
    document.querySelectorAll('.notification-close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.notification').style.display = 'none';
        });
    });

    // 基本設定タブの保存ボタン
    const saveBaseSettingsBtn = document.querySelector('#tab-base .btn-success');
    if (saveBaseSettingsBtn) {
        saveBaseSettingsBtn.addEventListener('click', function() {
            showNotification('基本設定が保存されました');
        });
    }

    // 各種検索フィールドの処理
    const searchFields = document.querySelectorAll('.search-field input');
    searchFields.forEach(field => {
        field.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                // Enter押下時の検索処理
                showNotification(`"${field.value}" で検索しています...`);
            }
        });
    });

    // 各種フィルターの変更検知
    const filterSelects = document.querySelectorAll('.search-options select, .search-options input');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // 実際の処理は省略
            showNotification('検索条件が変更されました');
        });
    });

    // ユーザー管理の保存ボタン
    const userSaveBtn = document.querySelector('#user-modal .btn-success');
    if (userSaveBtn) {
        userSaveBtn.addEventListener('click', function() {
            closeUserModal();
            showNotification('ユーザー情報が保存されました');
        });
    }

    // 学校管理の保存ボタン
    const schoolSaveBtn = document.querySelector('#school-modal .btn-success');
    if (schoolSaveBtn) {
        schoolSaveBtn.addEventListener('click', function() {
            closeSchoolModal();
            showNotification('学校情報が保存されました');
        });
    }

    // 金融機関管理の保存ボタン
    const bankSaveBtn = document.querySelector('#bank-modal .btn-success');
    if (bankSaveBtn) {
        bankSaveBtn.addEventListener('click', function() {
            closeBankModal();
            showNotification('金融機関情報が保存されました');
        });
    }

    // 外字ライブラリ管理ボタン
    const gaijilibBtn = document.querySelector('.form-group:nth-child(4) .btn-primary');
    if (gaijilibBtn) {
        gaijilibBtn.addEventListener('click', function() {
            showNotification('外字ライブラリ管理画面を準備中です');
        });
    }

    // 電子公印アップロードボタン
    const stampUploadBtn = document.querySelector('.form-group:nth-child(5) .btn-primary');
    if (stampUploadBtn) {
        stampUploadBtn.addEventListener('click', function() {
            showNotification('電子公印がアップロードされました');
        });
    }

    // バックアップボタン
    const backupBtn = document.querySelector('.form-group:nth-child(6) .btn-warning');
    if (backupBtn) {
        backupBtn.addEventListener('click', function() {
            showNotification('システムバックアップを開始しました。しばらくお待ちください...', 'info');
            
            // 3秒後に完了通知
            setTimeout(() => {
                showNotification('システムバックアップが完了しました');
            }, 3000);
        });
    }

    // インポート/エクスポートボタン
    const importExportBtns = document.querySelectorAll('.btn-warning[title*="エクスポート"], .btn-primary[title*="インポート"]');
    importExportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (btn.innerHTML.includes('エクスポート')) {
                showNotification('データをエクスポートしています...');
            } else if (btn.innerHTML.includes('インポート')) {
                showNotification('データをインポートする準備をしています...');
            }
        });
    });

    // ページネーションの処理
    const pageItems = document.querySelectorAll('.pagination .page-item');
    pageItems.forEach(item => {
        item.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                const currentActive = this.parentNode.querySelector('.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                this.classList.add('active');
                showNotification('ページが変更されました');
            }
        });
    });
});
