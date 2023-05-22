function redirectToIndexHome() {
    window.location.href = "./index.html";
}

document.getElementById('logoutButton').addEventListener('click', function() {
    // 刪除 Session Storage 中的所有資料
    sessionStorage.clear();

    // 返回首頁
    window.location.href = './index.html';
  });