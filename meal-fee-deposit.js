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

// 履歴タブ切り替え関数
function switchHistoryTab(tabId) {
    // すべてのタブコンテンツを非表示にする
    const tabContents = document.querySelectorAll('#payment-history-modal .tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // クリックされたタブに対応するコンテンツを表示する
    document.getElementById(tabId).classList.add('active');
    
    // タブのアクティブ状態を切り替える
    const tabs = document.querySelectorAll('#payment-history-modal .tabs .tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if(tab.getAttribute('onclick').includes(tabId)) {
            tab.classList.add('active');
        }
    });
}

// モーダルを表示する関数
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// モーダルを閉じる関数
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    
    // 現金入金モーダルの場合、フォームをリセット
    if (modalId === 'cash-payment-modal') {
        document.getElementById('student-search').value = '';
        document.getElementById('student-search-results').style.display = 'none';
        document.getElementById('selected-student-info').style.display = 'none';
        document.getElementById('payment-amount-container').style.display = 'none';
        document.getElementById('register-payment-btn').disabled = true;
    }
}

// 口座振替データ取込モーダルを表示
function showBankTransferModal() {
    showModal('bank-transfer-modal');
}

// 納付書入金モーダルを表示
function showPaymentSlipModal() {
    showModal('payment-slip-modal');
}

// 現金入金モーダルを表示
function showCashPaymentModal() {
    showModal('cash-payment-modal');
}

// 振替不能者再処理モーダルを表示
function showReprocessModal() {
    // 振替不能者データを取得（実際はAPIなどで取得する）
    const failureData = generateMockFailureData();
    renderFailureList(failureData);
    
    showModal('reprocess-modal');
}

// 生徒検索処理
function searchStudent() {
    const searchQuery = document.getElementById('student-search').value.trim();
    
    if (searchQuery.length < 2) {
        return;
    }
    
    // 実際はAPIでデータを取得する
    const searchResults = generateMockStudentSearchResults(searchQuery);
    
    // 検索結果を表示
    renderStudentSearchResults(searchResults);
}

// 生徒検索結果の表示
function renderStudentSearchResults(results) {
    const resultsBody = document.getElementById('search-results-body');
    resultsBody.innerHTML = '';
    
    if (results.length === 0) {
        resultsBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 10px;">該当する生徒が見つかりませんでした。</td></tr>';
    } else {
        results.forEach(student => {
            resultsBody.innerHTML += `
                <tr>
                    <td style="padding: 8px;">${student.id}</td>
                    <td style="padding: 8px;">${student.name}</td>
                    <td style="padding: 8px;">${student.school}</td>
                    <td style="padding: 8px;">${student.grade}年${student.class}組</td>
                    <td style="padding: 8px; text-align: center;">
                        <button class="btn btn-primary btn-sm" onclick="selectStudent('${student.id}', '${student.name}', '${student.school}', '${student.grade}年${student.class}組')">選択</button>
                    </td>
                </tr>
            `;
        });
    }
    
    document.getElementById('student-search-results').style.display = 'block';
}

// 生徒を選択
function selectStudent(id, name, school, gradeClass) {
    // 選択した生徒情報を表示
    document.getElementById('selected-student-id').textContent = id;
    document.getElementById('selected-student-name').textContent = name;
    document.getElementById('selected-student-school').textContent = school;
    document.getElementById('selected-student-class').textContent = gradeClass;
    
    document.getElementById('selected-student-info').style.display = 'block';
    document.getElementById('payment-amount-container').style.display = 'block';
    document.getElementById('register-payment-btn').disabled = false;
    
    // 検索結果を非表示
    document.getElementById('student-search-results').style.display = 'none';
}

// 口座振替データのインポート
function importBankTransferData() {
    const file = document.getElementById('bank-transfer-file').files[0];
    const transferDate = document.getElementById('transfer-date').value;
    const bank = document.getElementById('bank-select').value;
    const targetMonths = Array.from(document.querySelectorAll('input[name="target-month"]:checked')).map(cb => cb.value);
    
    if (!file) {
        showNotification('ファイルを選択してください', 'warning');
        return;
    }
    
    if (!transferDate) {
        showNotification('振替日を選択してください', 'warning');
        return;
    }
    
    if (!bank) {
        showNotification('金融機関を選択してください', 'warning');
        return;
    }
    
    if (targetMonths.length === 0) {
        showNotification('取込対象月を選択してください', 'warning');
        return;
    }
    
    // 実際はファイル処理とAPIへのデータ送信を行う
    // ここではモックで成功を表示
    
    showNotification('口座振替データを取り込みました', 'success');
    closeModal('bank-transfer-modal');
    
    // 口座振替結果タブに切り替え
    switchTab('tab-bank');
    
    // モックデータを表示
    renderBankTransferResults(generateMockBankTransferResults());
}

// 納付書入金データのインポート
function importPaymentSlipData() {
    const file = document.getElementById('payment-slip-file').files[0];
    const slipDate = document.getElementById('slip-date').value;
    const paymentLocation = document.getElementById('payment-location').value;
    
    if (!file) {
        showNotification('ファイルを選択してください', 'warning');
        return;
    }
    
    if (!slipDate) {
        showNotification('入金日を選択してください', 'warning');
        return;
    }
    
    if (!paymentLocation) {
        showNotification('支払場所を選択してください', 'warning');
        return;
    }
    
    // 実際はファイル処理とAPIへのデータ送信を行う
    // ここではモックで成功を表示
    
    showNotification('納付書入金データを取り込みました', 'success');
    closeModal('payment-slip-modal');
    
    // 納付書入金タブに切り替え
    switchTab('tab-slip');
    
    // モックデータを表示
    renderSlipPayments(generateMockSlipPayments());
}

// 現金入金の登録
function registerCashPayment() {
    const studentId = document.getElementById('selected-student-id').textContent;
    const cashDate = document.getElementById('cash-date').value;
    const targetMonth = document.getElementById('cash-target-month').value;
    const paymentAmount = document.getElementById('payment-amount').value;
    const notes = document.getElementById('payment-notes').value;
    
    if (!cashDate) {
        showNotification('入金日を選択してください', 'warning');
        return;
    }
    
    if (!targetMonth) {
        showNotification('入金対象月を選択してください', 'warning');
        return;
    }
    
    if (!paymentAmount) {
        showNotification('入金額を入力してください', 'warning');
        return;
    }
    
    // 実際はAPIへのデータ送信を行う
    // ここではモックで成功を表示
    
    showNotification('現金入金を登録しました', 'success');
    closeModal('cash-payment-modal');
    
    // 現金入金タブに切り替え
    switchTab('tab-cash');
    
    // モックデータを表示
    renderCashPayments(generateMockCashPayments());
}

// 振替不能者の再処理
function processFailures() {
    const selectedFailures = Array.from(document.querySelectorAll('#failure-list input[type="checkbox"]:checked'));
    const method = document.querySelector('input[name="reprocess-method"]:checked').value;
    const retryDate = document.getElementById('retry-date').value;
    
    if (selectedFailures.length === 0) {
        showNotification('対象者を選択してください', 'warning');
        return;
    }
    
    if (method === 'bank' && !retryDate) {
        showNotification('再振替日を選択してください', 'warning');
        return;
    }
    
    // 実際はAPIへのデータ送信を行う
    // ここではモックで成功を表示
    
    const messageAction = method === 'bank' ? '再振替' : '納付書発行';
    showNotification(`${selectedFailures.length}件の${messageAction}処理を実行しました`, 'success');
    closeModal('reprocess-modal');
}

// すべての振替不能者を選択/解除
function toggleAllFailures(checkbox) {
    const isChecked = checkbox.checked;
    const checkboxes = document.querySelectorAll('#failure-list input[type="checkbox"]');
    
    checkboxes.forEach(cb => {
        cb.checked = isChecked;
    });
}

// 個人の納付履歴を表示
function showPaymentHistory(studentId, studentName) {
    // 実際はAPIでデータを取得する
    const student = generateMockStudentData(studentId, studentName);
    
    // 生徒情報を表示
    document.getElementById('history-student-name').textContent = student.name;
    document.getElementById('history-student-school').textContent = student.school;
    document.getElementById('history-student-class').textContent = `${student.grade}年${student.class}組`;
    document.getElementById('history-payment-method').textContent = student.paymentMethod;
    document.getElementById('history-bank-info').textContent = student.bankInfo || '未登録';
    
    // 月別収納状況を表示
    renderMonthlyPaymentHistory(student.monthlyHistory);
    
    // 入金履歴を表示
    renderPaymentHistoryList(student.paymentHistory);
    
    // モーダルを表示
    showModal('payment-history-modal');
}

// 月別収納状況の表示
function renderMonthlyPaymentHistory(history) {
    const historyBody = document.getElementById('monthly-payment-history');
    historyBody.innerHTML = '';
    
    history.forEach(item => {
        const statusClass = item.status === '完納' ? 'success' : (item.status === '一部納付' ? 'warning' : 'danger');
        const statusStyle = `color: var(--${statusClass}-color);`;
        
        historyBody.innerHTML += `
            <tr>
                <td style="padding: 10px;">${item.month}</td>
                <td style="padding: 10px; text-align: right;">${item.billingAmount}</td>
                <td style="padding: 10px; text-align: right;">${item.paidAmount}</td>
                <td style="padding: 10px; text-align: right;">${item.unpaidAmount}</td>
                <td style="padding: 10px; text-align: center;">${item.paymentDate || '-'}</td>
                <td style="padding: 10px; text-align: center;">${item.paymentMethod || '-'}</td>
                <td style="padding: 10px; text-align: center; font-weight: bold; ${statusStyle}">${item.status}</td>
            </tr>
        `;
    });
}

// 入金履歴リストの表示
function renderPaymentHistoryList(history) {
    const historyBody = document.getElementById('payment-history-list');
    historyBody.innerHTML = '';
    
    if (history.length === 0) {
        historyBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 10px;">入金履歴がありません。</td></tr>';
        return;
    }
    
    history.forEach(item => {
        historyBody.innerHTML += `
            <tr>
                <td style="padding: 10px;">${item.date}</td>
                <td style="padding: 10px; text-align: center;">${item.method}</td>
                <td style="padding: 10px;">${item.targetMonth}</td>
                <td style="padding: 10px; text-align: right;">${item.amount}</td>
                <td style="padding: 10px;">${item.notes || '-'}</td>
            </tr>
        `;
    });
}

// 口座振替結果の表示
function renderBankTransferResults(results) {
    const resultsBody = document.getElementById('bank-transfer-results');
    resultsBody.innerHTML = '';
    
    results.forEach(item => {
        const resultClass = item.result === '成功' ? 'success' : 'danger';
        const resultStyle = `color: var(--${resultClass}-color);`;
        
        resultsBody.innerHTML += `
            <tr>
                <td style="padding: 10px;">${item.date}</td>
                <td style="padding: 10px;">${item.studentId}</td>
                <td style="padding: 10px;">${item.name}</td>
                <td style="padding: 10px;">${item.bank}</td>
                <td style="padding: 10px;">${item.accountNumber}</td>
                <td style="padding: 10px; text-align: right;">${item.amount}</td>
                <td style="padding: 10px; text-align: center; font-weight: bold; ${resultStyle}">${item.result}</td>
                <td style="padding: 10px;">${item.failReason || '-'}</td>
                <td style="padding: 10px; text-align: center;">
                    <button class="btn btn-primary btn-sm" onclick="showPaymentHistory('${item.studentId}', '${item.name}')">
                        <i class="fas fa-history"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// 納付書入金の表示
function renderSlipPayments(payments) {
    const paymentsBody = document.getElementById('slip-payment-list');
    paymentsBody.innerHTML = '';
    
    payments.forEach(item => {
        const statusClass = item.status === '消込済' ? 'success' : 'warning';
        const statusStyle = `color: var(--${statusClass}-color);`;
        
        paymentsBody.innerHTML += `
            <tr>
                <td style="padding: 10px;">${item.slipNumber}</td>
                <td style="padding: 10px;">${item.date}</td>
                <td style="padding: 10px;">${item.studentId}</td>
                <td style="padding: 10px;">${item.name}</td>
                <td style="padding: 10px;">${item.location}</td>
                <td style="padding: 10px; text-align: right;">${item.billingAmount}</td>
                <td style="padding: 10px; text-align: right;">${item.paidAmount}</td>
                <td style="padding: 10px; text-align: center; font-weight: bold; ${statusStyle}">${item.status}</td>
                <td style="padding: 10px; text-align: center;">
                    <button class="btn btn-primary btn-sm" onclick="showPaymentHistory('${item.studentId}', '${item.name}')">
                        <i class="fas fa-history"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// 現金入金の表示
function renderCashPayments(payments) {
    const paymentsBody = document.getElementById('cash-payment-list');
    paymentsBody.innerHTML = '';
    
    payments.forEach(item => {
        const statusClass = item.status === '消込済' ? 'success' : 'warning';
        const statusStyle = `color: var(--${statusClass}-color);`;
        
        paymentsBody.innerHTML += `
            <tr>
                <td style="padding: 10px;">${item.paymentId}</td>
                <td style="padding: 10px;">${item.date}</td>
                <td style="padding: 10px;">${item.studentId}</td>
                <td style="padding: 10px;">${item.name}</td>
                <td style="padding: 10px;">${item.school}</td>
                <td style="padding: 10px; text-align: right;">${item.billingAmount}</td>
                <td style="padding: 10px; text-align: right;">${item.paidAmount}</td>
                <td style="padding: 10px; text-align: center; font-weight: bold; ${statusStyle}">${item.status}</td>
                <td style="padding: 10px; text-align: center;">
                    <button class="btn btn-primary btn-sm" onclick="showPaymentHistory('${item.studentId}', '${item.name}')">
                        <i class="fas fa-history"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// 個人別入金状況の表示
function renderIndividualPayments(payments) {
    const paymentsBody = document.getElementById('individual-payments-list');
    paymentsBody.innerHTML = '';
    
    payments.forEach(item => {
        const statusClass = item.status === '完納' ? 'success' : (item.status === '一部納付' ? 'warning' : 'danger');
        const statusStyle = `color: var(--${statusClass}-color);`;
        
        paymentsBody.innerHTML += `
            <tr>
                <td style="padding: 10px;">${item.studentId}</td>
                <td style="padding: 10px;">${item.name}</td>
                <td style="padding: 10px;">${item.school}</td>
                <td style="padding: 10px;">${item.grade}年${item.class}組</td>
                <td style="padding: 10px;">${item.paymentMethod}</td>
                <td style="padding: 10px; text-align: right;">${item.billingAmount}</td>
                <td style="padding: 10px; text-align: right;">${item.paidAmount}</td>
                <td style="padding: 10px; text-align: right;">${item.unpaidAmount}</td>
                <td style="padding: 10px; text-align: center; font-weight: bold; ${statusStyle}">${item.status}</td>
                <td style="padding: 10px; text-align: center;">
                    <button class="btn btn-primary btn-sm" onclick="showPaymentHistory('${item.studentId}', '${item.name}')">
                        <i class="fas fa-history"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// 振替不能者一覧の表示
function renderFailureList(failures) {
    const failureBody = document.getElementById('failure-list');
    failureBody.innerHTML = '';
    
    failures.forEach(item => {
        failureBody.innerHTML += `
            <tr>
                <td style="padding: 8px; text-align: center;">
                    <input type="checkbox" class="failure-checkbox" value="${item.studentId}">
                </td>
                <td style="padding: 8px;">${item.studentId}</td>
                <td style="padding: 8px;">${item.name}</td>
                <td style="padding: 8px;">${item.bank}</td>
                <td style="padding: 8px; text-align: right;">${item.amount}</td>
                <td style="padding: 8px;">${item.failReason}</td>
            </tr>
        `;
    });
}

// 日別入金状況の読み込み
function loadDailyReport() {
    const reportDate = document.getElementById('daily-report-date').value;
    
    if (!reportDate) {
        showNotification('日付を選択してください', 'warning');
        return;
    }
    
    // 実際はAPIでデータを取得する
    const dailyData = generateMockDailyReport(reportDate);
    
    // 日別集計を表示
    renderDailySummary(dailyData);
    
    // 日付を表示用にフォーマット
    const formattedDate = new Date(reportDate).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
    document.querySelector('.card-title').textContent = `${formattedDate}の入金集計`;
}

// 日別入金集計の表示
function renderDailySummary(data) {
    const summaryBody = document.getElementById('daily-summary');
    summaryBody.innerHTML = '';
    
    let totalCount = 0;
    let totalAmount = 0;
    
    data.forEach(item => {
        totalCount += item.count;
        totalAmount += parseInt(item.amount.replace(/[¥,]/g, ''));
        
        summaryBody.innerHTML += `
            <tr>
                <td style="padding: 10px;">${item.method}</td>
                <td style="padding: 10px; text-align: right;">${item.count}件</td>
                <td style="padding: 10px; text-align: right;">${item.amount}</td>
            </tr>
        `;
    });
    
    // 合計を表示
    document.getElementById('total-count').textContent = `${totalCount}件`;
    document.getElementById('total-amount').textContent = `¥${totalAmount.toLocaleString()}`;
}

// 納付書入金のフィルタリング
function filterSlipPayments() {
    const date = document.getElementById('slip-payment-date').value;
    const location = document.getElementById('payment-location-filter').value;
    
    // 実際はAPIでフィルタリングされたデータを取得する
    const filteredData = generateMockSlipPayments().filter(item => {
        if (location !== 'all' && item.location !== getLocationName(location)) {
            return false;
        }
        return true;
    });
    
    renderSlipPayments(filteredData);
}

// 現金入金のフィルタリング
function filterCashPayments() {
    const date = document.getElementById('cash-payment-date').value;
    const school = document.getElementById('cash-school-filter').value;
    
    // 実際はAPIでフィルタリングされたデータを取得する
    const filteredData = generateMockCashPayments().filter(item => {
        if (school !== 'all' && !item.school.includes(getSchoolName(school))) {
            return false;
        }
        return true;
    });
    
    renderCashPayments(filteredData);
}

// さらに表示ボタン処理
function loadMoreIndividualPayments() {
    // 実際はAPIでページネーションされたデータを取得する
    const additionalData = generateMoreMockIndividualPayments();
    
    // 既存のデータに追加
    const paymentsBody = document.getElementById('individual-payments-list');
    
    additionalData.forEach(item => {
        const statusClass = item.status === '完納' ? 'success' : (item.status === '一部納付' ? 'warning' : 'danger');
        const statusStyle = `color: var(--${statusClass}-color);`;
        
        paymentsBody.innerHTML += `
            <tr>
                <td style="padding: 10px;">${item.studentId}</td>
                <td style="padding: 10px;">${item.name}</td>
                <td style="padding: 10px;">${item.school}</td>
                <td style="padding: 10px;">${item.grade}年${item.class}組</td>
                <td style="padding: 10px;">${item.paymentMethod}</td>
                <td style="padding: 10px; text-align: right;">${item.billingAmount}</td>
                <td style="padding: 10px; text-align: right;">${item.paidAmount}</td>
                <td style="padding: 10px; text-align: right;">${item.unpaidAmount}</td>
                <td style="padding: 10px; text-align: center; font-weight: bold; ${statusStyle}">${item.status}</td>
                <td style="padding: 10px; text-align: center;">
                    <button class="btn btn-primary btn-sm" onclick="showPaymentHistory('${item.studentId}', '${item.name}')">
                        <i class="fas fa-history"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// 支払方法のフィルタリング変更時の処理
function onPaymentMethodFilterChange() {
    const method = document.getElementById('payment-method-filter').value;
    
    // 実際はAPIでフィルタリングされたデータを取得する
    const filteredData = generateMockIndividualPayments().filter(item => {
        if (method !== 'all' && !getPaymentMethodFromFilter(method).includes(item.paymentMethod)) {
            return false;
        }
        return true;
    });
    
    renderIndividualPayments(filteredData);
}

// 納付状況のフィルタリング変更時の処理
function onPaymentStatusFilterChange() {
    const status = document.getElementById('payment-status-filter').value;
    
    // 実際はAPIでフィルタリングされたデータを取得する
    const filteredData = generateMockIndividualPayments().filter(item => {
        if (status === 'paid' && item.status !== '完納') {
            return false;
        } else if (status === 'unpaid' && item.status !== '未納') {
            return false;
        } else if (status === 'partial' && item.status !== '一部納付') {
            return false;
        }
        return true;
    });
    
    renderIndividualPayments(filteredData);
}

// 学校のフィルタリング変更時の処理
function onSchoolFilterChange() {
    const school = document.getElementById('school-filter').value;
    
    // 実際はAPIでフィルタリングされたデータを取得する
    const filteredData = generateMockIndividualPayments().filter(item => {
        if (school !== 'all' && !item.school.includes(getSchoolName(school))) {
            return false;
        }
        return true;
    });
    
    renderIndividualPayments(filteredData);
}

// 処理方法ラジオボタン変更時の処理
function onReprocessMethodChange() {
    const method = document.querySelector('input[name="reprocess-method"]:checked').value;
    const retryDateContainer = document.getElementById('retry-date-container');
    
    if (method === 'bank') {
        retryDateContainer.style.display = 'block';
    } else {
        retryDateContainer.style.display = 'none';
    }
}

// 日計表をエクスポート
function exportDailyReport() {
    const reportDate = document.getElementById('daily-report-date').value;
    
    if (!reportDate) {
        showNotification('日付を選択してください', 'warning');
        return;
    }
    
    // 実際はAPIでPDFやExcelファイルを生成して提供する
    showNotification('日計表のダウンロードが開始されました', 'success');
}

// 口座振替結果をエクスポート
function exportBankTransferResults() {
    // 実際はAPIでPDFやExcelファイルを生成して提供する
    showNotification('口座振替結果のダウンロードが開始されました', 'success');
}

// 支払履歴をエクスポート
function exportPaymentHistory() {
    const studentName = document.getElementById('history-student-name').textContent;
    
    // 実際はAPIでPDFやExcelファイルを生成して提供する
    showNotification(`${studentName}さんの納付履歴のダウンロードが開始されました`, 'success');
}

// 学校名を取得
function getSchoolName(code) {
    const schools = {
        'school1': '文京第一小学校',
        'school2': '文京第二小学校',
        'school3': '文京第三小学校',
        'jhs1': '文京第一中学校'
    };
    
    return schools[code] || '';
}

// 支払場所名を取得
function getLocationName(code) {
    const locations = {
        'bank': '金融機関',
        'conbini': 'コンビニエンスストア',
        'district': '区役所窓口'
    };
    
    return locations[code] || '';
}

// 支払方法名を取得
function getPaymentMethodFromFilter(code) {
    const methods = {
        'bank': '口座振替',
        'slip': '納付書',
        'cash': '現金'
    };
    
    return methods[code] || '';
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

// モックデータの生成
function generateMockIndividualPayments() {
    return [
        {
            studentId: 'S2025001',
            name: '佐藤 太郎',
            school: '文京第一小学校',
            grade: '3',
            class: '1',
            paymentMethod: '口座振替',
            billingAmount: '¥5,000',
            paidAmount: '¥5,000',
            unpaidAmount: '¥0',
            status: '完納'
        },
        {
            studentId: 'S2025002',
            name: '鈴木 花子',
            school: '文京第一小学校',
            grade: '2',
            class: '2',
            paymentMethod: '口座振替',
            billingAmount: '¥5,000',
            paidAmount: '¥5,000',
            unpaidAmount: '¥0',
            status: '完納'
        },
        {
            studentId: 'S2025003',
            name: '田中 明',
            school: '文京第二小学校',
            grade: '4',
            class: '1',
            paymentMethod: '納付書',
            billingAmount: '¥5,000',
            paidAmount: '¥3,000',
            unpaidAmount: '¥2,000',
            status: '一部納付'
        },
        {
            studentId: 'S2025004',
            name: '山田 健太',
            school: '文京第三小学校',
            grade: '5',
            class: '3',
            paymentMethod: '口座振替',
            billingAmount: '¥5,000',
            paidAmount: '¥0',
            unpaidAmount: '¥5,000',
            status: '未納'
        },
        {
            studentId: 'S2025005',
            name: '伊藤 さくら',
            school: '文京第一中学校',
            grade: '1',
            class: '2',
            paymentMethod: '現金',
            billingAmount: '¥5,500',
            paidAmount: '¥5,500',
            unpaidAmount: '¥0',
            status: '完納'
        }
    ];
}

function generateMoreMockIndividualPayments() {
    return [
        {
            studentId: 'S2025006',
            name: '高橋 一郎',
            school: '文京第二小学校',
            grade: '6',
            class: '1',
            paymentMethod: '納付書',
            billingAmount: '¥5,000',
            paidAmount: '¥0',
            unpaidAmount: '¥5,000',
            status: '未納'
        },
        {
            studentId: 'S2025007',
            name: '渡辺 美咲',
            school: '文京第一中学校',
            grade: '2',
            class: '3',
            paymentMethod: '口座振替',
            billingAmount: '¥5,500',
            paidAmount: '¥5,500',
            unpaidAmount: '¥0',
            status: '完納'
        },
        {
            studentId: 'S2025008',
            name: '小林 健',
            school: '文京第三小学校',
            grade: '1',
            class: '2',
            paymentMethod: '納付書',
            billingAmount: '¥5,000',
            paidAmount: '¥2,500',
            unpaidAmount: '¥2,500',
            status: '一部納付'
        }
    ];
}

function generateMockBankTransferResults() {
    return [
        {
            date: '2025年4月27日',
            studentId: 'S2025001',
            name: '佐藤 太郎',
            bank: 'みずほ銀行',
            accountNumber: '1234567',
            amount: '¥5,000',
            result: '成功',
            failReason: ''
        },
        {
            date: '2025年4月27日',
            studentId: 'S2025002',
            name: '鈴木 花子',
            bank: '三菱UFJ銀行',
            accountNumber: '2345678',
            amount: '¥5,000',
            result: '成功',
            failReason: ''
        },
        {
            date: '2025年4月27日',
            studentId: 'S2025004',
            name: '山田 健太',
            bank: 'りそな銀行',
            accountNumber: '3456789',
            amount: '¥5,000',
            result: '不能',
            failReason: '残高不足'
        },
        {
            date: '2025年4月27日',
            studentId: 'S2025007',
            name: '渡辺 美咲',
            bank: '三井住友銀行',
            accountNumber: '4567890',
            amount: '¥5,500',
            result: '成功',
            failReason: ''
        },
        {
            date: '2025年4月27日',
            studentId: 'S2025010',
            name: '加藤 雄太',
            bank: 'ゆうちょ銀行',
            accountNumber: '5678901',
            amount: '¥5,000',
            result: '不能',
            failReason: '口座解約済'
        }
    ];
}

function generateMockSlipPayments() {
    return [
        {
            slipNumber: 'P2025001234',
            date: '2025年4月25日',
            studentId: 'S2025003',
            name: '田中 明',
            location: '金融機関',
            billingAmount: '¥5,000',
            paidAmount: '¥3,000',
            status: '消込済'
        },
        {
            slipNumber: 'P2025001235',
            date: '2025年4月26日',
            studentId: 'S2025006',
            name: '高橋 一郎',
            location: 'コンビニエンスストア',
            billingAmount: '¥5,000',
            paidAmount: '¥5,000',
            status: '消込済'
        },
        {
            slipNumber: 'P2025001236',
            date: '2025年4月27日',
            studentId: 'S2025008',
            name: '小林 健',
            location: '区役所窓口',
            billingAmount: '¥5,000',
            paidAmount: '¥2,500',
            status: '消込済'
        }
    ];
}

function generateMockCashPayments() {
    return [
        {
            paymentId: 'C2025000123',
            date: '2025年4月26日',
            studentId: 'S2025005',
            name: '伊藤 さくら',
            school: '文京第一中学校',
            billingAmount: '¥5,500',
            paidAmount: '¥5,500',
            status: '消込済'
        },
        {
            paymentId: 'C2025000124',
            date: '2025年4月27日',
            studentId: 'S2025009',
            name: '佐々木 健太',
            school: '文京第二小学校',
            billingAmount: '¥5,000',
            paidAmount: '¥5,000',
            status: '消込済'
        }
    ];
}

function generateMockDailyReport(date) {
    // 日付を表示用にフォーマット
    const formattedDate = new Date(date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
    
    return [
        {
            method: '口座振替',
            count: 3,
            amount: '¥15,500'
        },
        {
            method: '納付書',
            count: 3,
            amount: '¥10,500'
        },
        {
            method: '現金',
            count: 2,
            amount: '¥10,500'
        }
    ];
}

function generateMockFailureData() {
    return [
        {
            studentId: 'S2025004',
            name: '山田 健太',
            bank: 'りそな銀行',
            amount: '¥5,000',
            failReason: '残高不足'
        },
        {
            studentId: 'S2025010',
            name: '加藤 雄太',
            bank: 'ゆうちょ銀行',
            amount: '¥5,000',
            failReason: '口座解約済'
        },
        {
            studentId: 'S2025015',
            name: '中村 悠太',
            bank: '三菱UFJ銀行',
            amount: '¥5,500',
            failReason: '口座番号相違'
        }
    ];
}

function generateMockStudentSearchResults(query) {
    const allStudents = [
        {
            id: 'S2025001',
            name: '佐藤 太郎',
            school: '文京第一小学校',
            grade: '3',
            class: '1'
        },
        {
            id: 'S2025002',
            name: '鈴木 花子',
            school: '文京第一小学校',
            grade: '2',
            class: '2'
        },
        {
            id: 'S2025003',
            name: '田中 明',
            school: '文京第二小学校',
            grade: '4',
            class: '1'
        },
        {
            id: 'S2025004',
            name: '山田 健太',
            school: '文京第三小学校',
            grade: '5',
            class: '3'
        },
        {
            id: 'S2025005',
            name: '伊藤 さくら',
            school: '文京第一中学校',
            grade: '1',
            class: '2'
        }
    ];
    
    // 検索クエリでフィルタリング
    return allStudents.filter(student => 
        student.id.includes(query) || 
        student.name.includes(query)
    );
}

function generateMockStudentData(studentId, name) {
    // 異なる生徒データを返す
    if (studentId === 'S2025001') {
        return {
            id: studentId,
            name: name,
            school: '文京第一小学校',
            grade: '3',
            class: '1',
            paymentMethod: '口座振替',
            bankInfo: 'みずほ銀行 本郷支店 普通 1234567',
            monthlyHistory: [
                {
                    month: '2025年4月',
                    billingAmount: '¥5,000',
                    paidAmount: '¥5,000',
                    unpaidAmount: '¥0',
                    paymentDate: '2025/04/27',
                    paymentMethod: '口座振替',
                    status: '完納'
                },
                {
                    month: '2025年3月',
                    billingAmount: '¥5,000',
                    paidAmount: '¥5,000',
                    unpaidAmount: '¥0',
                    paymentDate: '2025/03/27',
                    paymentMethod: '口座振替',
                    status: '完納'
                },
                {
                    month: '2025年2月',
                    billingAmount: '¥5,000',
                    paidAmount: '¥5,000',
                    unpaidAmount: '¥0',
                    paymentDate: '2025/02/27',
                    paymentMethod: '口座振替',
                    status: '完納'
                }
            ],
            paymentHistory: [
                {
                    date: '2025/04/27',
                    method: '口座振替',
                    targetMonth: '2025年4月',
                    amount: '¥5,000',
                    notes: ''
                },
                {
                    date: '2025/03/27',
                    method: '口座振替',
                    targetMonth: '2025年3月',
                    amount: '¥5,000',
                    notes: ''
                },
                {
                    date: '2025/02/27',
                    method: '口座振替',
                    targetMonth: '2025年2月',
                    amount: '¥5,000',
                    notes: ''
                }
            ]
        };
    } else if (studentId === 'S2025003') {
        return {
            id: studentId,
            name: name,
            school: '文京第二小学校',
            grade: '4',
            class: '1',
            paymentMethod: '納付書',
            bankInfo: '未登録',
            monthlyHistory: [
                {
                    month: '2025年4月',
                    billingAmount: '¥5,000',
                    paidAmount: '¥3,000',
                    unpaidAmount: '¥2,000',
                    paymentDate: '2025/04/25',
                    paymentMethod: '納付書',
                    status: '一部納付'
                },
                {
                    month: '2025年3月',
                    billingAmount: '¥5,000',
                    paidAmount: '¥5,000',
                    unpaidAmount: '¥0',
                    paymentDate: '2025/03/15',
                    paymentMethod: '納付書',
                    status: '完納'
                },
                {
                    month: '2025年2月',
                    billingAmount: '¥5,000',
                    paidAmount: '¥5,000',
                    unpaidAmount: '¥0',
                    paymentDate: '2025/02/20',
                    paymentMethod: '納付書',
                    status: '完納'
                }
            ],
            paymentHistory: [
                {
                    date: '2025/04/25',
                    method: '納付書',
                    targetMonth: '2025年4月',
                    amount: '¥3,000',
                    notes: '一部納付'
                },
                {
                    date: '2025/03/15',
                    method: '納付書',
                    targetMonth: '2025年3月',
                    amount: '¥5,000',
                    notes: ''
                },
                {
                    date: '2025/02/20',
                    method: '納付書',
                    targetMonth: '2025年2月',
                    amount: '¥5,000',
                    notes: ''
                }
            ]
        };
    } else if (studentId === 'S2025004') {
        return {
            id: studentId,
            name: name,
            school: '文京第三小学校',
            grade: '5',
            class: '3',
            paymentMethod: '口座振替',
            bankInfo: 'りそな銀行 茗荷谷支店 普通 3456789',
            monthlyHistory: [
                {
                    month: '2025年4月',
                    billingAmount: '¥5,000',
                    paidAmount: '¥0',
                    unpaidAmount: '¥5,000',
                    paymentDate: '',
                    paymentMethod: '',
                    status: '未納'
                },
                {
                    month: '2025年3月',
                    billingAmount: '¥5,000',
                    paidAmount: '¥5,000',
                    unpaidAmount: '¥0',
                    paymentDate: '2025/03/27',
                    paymentMethod: '口座振替',
                    status: '完納'
                },
                {
                    month: '2025年2月',
                    billingAmount: '¥5,000',
                    paidAmount: '¥5,000',
                    unpaidAmount: '¥0',
                    paymentDate: '2025/02/27',
                    paymentMethod: '口座振替',
                    status: '完納'
                }
            ],
            paymentHistory: [
                {
                    date: '2025/04/27',
                    method: '口座振替',
                    targetMonth: '2025年4月',
                    amount: '¥5,000',
                    notes: '振替不能：残高不足'
                },
                {
                    date: '2025/03/27',
                    method: '口座振替',
                    targetMonth: '2025年3月',
                    amount: '¥5,000',
                    notes: ''
                },
                {
                    date: '2025/02/27',
                    method: '口座振替',
                    targetMonth: '2025年2月',
                    amount: '¥5,000',
                    notes: ''
                }
            ]
        };
    } else {
        // デフォルトのモックデータ
        return {
            id: studentId,
            name: name,
            school: '文京第一小学校',
            grade: '1',
            class: '1',
            paymentMethod: '口座振替',
            bankInfo: '三菱UFJ銀行 本駒込支店 普通 9876543',
            monthlyHistory: [
                {
                    month: '2025年4月',
                    billingAmount: '¥5,000',
                    paidAmount: '¥5,000',
                    unpaidAmount: '¥0',
                    paymentDate: '2025/04/27',
                    paymentMethod: '口座振替',
                    status: '完納'
                },
                {
                    month: '2025年3月',
                    billingAmount: '¥5,000',
                    paidAmount: '¥5,000',
                    unpaidAmount: '¥0',
                    paymentDate: '2025/03/27',
                    paymentMethod: '口座振替',
                    status: '完納'
                }
            ],
            paymentHistory: [
                {
                    date: '2025/04/27',
                    method: '口座振替',
                    targetMonth: '2025年4月',
                    amount: '¥5,000',
                    notes: ''
                },
                {
                    date: '2025/03/27',
                    method: '口座振替',
                    targetMonth: '2025年3月',
                    amount: '¥5,000',
                    notes: ''
                }
            ]
        };
    }
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', function() {
    // 初期データ読み込み
    renderIndividualPayments(generateMockIndividualPayments());
    
    // 生徒検索入力イベント
    const studentSearchInput = document.getElementById('student-search');
    if (studentSearchInput) {
        studentSearchInput.addEventListener('input', function() {
            searchStudent();
        });
    }
    
    // フィルター変更イベント
    const paymentMethodFilter = document.getElementById('payment-method-filter');
    if (paymentMethodFilter) {
        paymentMethodFilter.addEventListener('change', onPaymentMethodFilterChange);
    }
    
    const paymentStatusFilter = document.getElementById('payment-status-filter');
    if (paymentStatusFilter) {
        paymentStatusFilter.addEventListener('change', onPaymentStatusFilterChange);
    }
    
    const schoolFilter = document.getElementById('school-filter');
    if (schoolFilter) {
        schoolFilter.addEventListener('change', onSchoolFilterChange);
    }
    
    // 処理方法ラジオボタン変更イベント
    const reprocessMethodRadios = document.querySelectorAll('input[name="reprocess-method"]');
    reprocessMethodRadios.forEach(radio => {
        radio.addEventListener('change', onReprocessMethodChange);
    });
    
    // 日付ナビゲータのイベント設定
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const calendarBtn = document.getElementById('calendar-btn');
    const currentMonthEl = document.getElementById('current-month');
    
    if (prevMonthBtn && nextMonthBtn && calendarBtn && currentMonthEl) {
        // 現在の日付テキストを取得
        let currentText = currentMonthEl.textContent;
        
        prevMonthBtn.addEventListener('click', function() {
            // 実際のシステムでは前月のデータを取得
            if (currentText === '2025年4月') {
                currentText = '2025年3月';
            } else if (currentText === '2025年5月') {
                currentText = '2025年4月';
            } else if (currentText === '2025年3月') {
                currentText = '2025年2月';
            }
            
            currentMonthEl.textContent = currentText;
            showNotification(`${currentText}のデータを表示しています`);
            
            // データを再読み込み（実際はAPIでデータを取得）
            renderIndividualPayments(generateMockIndividualPayments());
        });
        
        nextMonthBtn.addEventListener('click', function() {
            // 実際のシステムでは次月のデータを取得
            if (currentText === '2025年4月') {
                currentText = '2025年5月';
            } else if (currentText === '2025年3月') {
                currentText = '2025年4月';
            } else if (currentText === '2025年2月') {
                currentText = '2025年3月';
            }
            
            currentMonthEl.textContent = currentText;
            showNotification(`${currentText}のデータを表示しています`);
            
            // データを再読み込み（実際はAPIでデータを取得）
            renderIndividualPayments(generateMockIndividualPayments());
        });
        
        calendarBtn.addEventListener('click', function() {
            // 実際のシステムではカレンダーモーダルを表示
            showNotification('月選択カレンダーは実装中です', 'info');
        });
    }
});