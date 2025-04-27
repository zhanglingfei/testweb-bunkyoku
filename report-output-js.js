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

// レポートを選択する関数
function selectReport(reportId) {
    // レポート設定パネルを表示
    const settingsPanel = document.getElementById('report-settings-panel');
    settingsPanel.style.display = 'block';
    
    // レポートタイトルを設定
    const reportTitles = {
        'fee-notification': '給食費納入通知書',
        'fee-change': '給食費納入額変更通知書',
        'fee-credit': '給食費充当通知書',
        'fee-refund': '給食費還付決定通知書',
        'reminder': '督促状',
        'demand': '催告書',
        'installment-agreement': '分割納付誓約書',
        'student-list': '学校学年別対象者一覧',
        'meal-status': '給食実施（喫食）状況表',
        'bank-transfer-fail': '口座振替不能者一覧',
        'welfare-list': '生活保護認定者給食費一覧',
        'subsidy-list': '就学援助認定者給食費一覧',
        'childcare-allowance': '児童手当から徴収した給食費一覧',
        'delinquent-list': '未収金対象者一覧表',
        'bad-debt-list': '不納欠損一覧表',
        'daily-report': '日計表',
        'monthly-report': '月計表',
        'monthly-summary': '収納状況集計表（月別）',
        'yearly-summary': '年度別集計表',
        'school-statistics': '学校別統計資料',
        'grade-statistics': '学年別統計資料',
        'special-case-statistics': '特例情報統計資料'
    };
    
    document.getElementById('selected-report-title').textContent = reportTitles[reportId] || 'レポート設定';
    
    // 特例情報フィルターの表示/非表示
    const specialCaseFilter = document.getElementById('special-case-filter');
    if (['welfare-list', 'subsidy-list', 'childcare-allowance', 'special-case-statistics'].includes(reportId)) {
        specialCaseFilter.style.display = 'block';
    } else {
        specialCaseFilter.style.display = 'none';
    }
    
    // 支払方法フィルターの表示/非表示
    const paymentMethodFilter = document.getElementById('payment-method-filter');
    if (['monthly-report', 'daily-report', 'monthly-summary', 'yearly-summary'].includes(reportId)) {
        paymentMethodFilter.style.display = 'block';
    } else {
        paymentMethodFilter.style.display = 'none';
    }
    
    // レポートIDを保存（後で使用するため）
    selectedReportId = reportId;
    
    // ページをスクロールしてレポート設定パネルを表示
    settingsPanel.scrollIntoView({ behavior: 'smooth' });
}

// レポート設定パネルを閉じる
function closeReportSettings() {
    document.getElementById('report-settings-panel').style.display = 'none';
}

// 選択したレポートをプレビュー
function previewSelectedReport() {
    // プレビューモーダルを表示
    document.getElementById('report-preview-modal').style.display = 'flex';
    
    // 実際のシステムではAPIでプレビューデータを取得して表示
    showNotification('レポートのプレビューを生成しました', 'success');
}

// プレビューモーダルを閉じる
function closePreviewModal() {
    document.getElementById('report-preview-modal').style.display = 'none';
}

// レポートを生成する関数
function generateReport() {
    // 実際のシステムではAPIにレポート生成リクエストを送信
    
    // 選択されたフォーマットを取得
    let format = 'PDF';
    document.querySelectorAll('input[name="file-format"]').forEach(input => {
        if (input.checked) {
            format = input.value.toUpperCase();
        }
    });
    
    // 期間の設定を取得
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    
    // 通知を表示
    showNotification(`レポートが正常に生成されました（${format}形式）`, 'success');
    
    // レポート設定パネルを閉じる
    closeReportSettings();
}

// レポートをダウンロードする関数
function downloadReport() {
    // 実際のシステムではAPIからファイルをダウンロード
    
    // 通知を表示
    showNotification('レポートのダウンロードが開始されました', 'info');
    
    // プレビューモーダルを閉じる
    closePreviewModal();
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

// メインのレポートプレビュー機能
function previewReport() {
    // レポートが選択されていない場合は通知を表示
    showNotification('プレビューするレポートを選択してください', 'warning');
}

// メインのレポート出力機能
function exportReport() {
    // レポートが選択されていない場合は通知を表示
    showNotification('出力するレポートを選択してください', 'warning');
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
            showNotification('月選択カレンダーは実装中です', 'info');
        });
    }
});

// 実際のシステムではこの変数を使用してレポートIDを追跡
let selectedReportId = null;