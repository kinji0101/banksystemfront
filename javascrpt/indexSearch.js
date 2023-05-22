var yourDataArray = [
    { title: '登入功能', link: './indexLogIn.html' },
    {title: '登出', link: './indexlogout.html' },
    {title: '提款功能', link: './indexwithdraw.html' },
    {title: '匯款功能', link: './indexTrans.html' },
    {title: '查詢帳戶餘額', link: './indexdeposit.html' }
  ];
  
  document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    var searchTerm = document.getElementById("searchInput").value;
    console.log("搜尋關鍵字：" + searchTerm);
    
    // 在這裡進行搜尋相關的處理
    // 假設你使用 Fuse.js 進行搜尋
    var options = {
      keys: ['title', 'content'] // 設定要搜尋的鍵值，這裡以 title 和 content 為例
    };
    var fuse = new Fuse(yourDataArray, options); // 將你的資料陣列和選項傳遞給 Fuse.js
    var results = fuse.search(searchTerm); // 進行搜尋
    
    // 定義頁面對應的 URL 或其他相關資訊
    var pageData = [
      {title: '登入功能', link: './indexLogIn.html' },
      {title: '登出', link: './indexlogout.html' },
      {title: '提款功能', link: './indexwithdraw.html' },
      {title: '匯款功能', link: './indexTrans.html' },
      {title: '查詢帳戶餘額', link: './indexdeposit.html' }
    ];
    
    // 搜尋結果中的相關頁面跳轉處理
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var pageTitle = result.item.title;
        
        // 檢查是否有相關頁面的資訊
        var page = pageData.find(function(item) {
          return item.title === pageTitle;
        });
        
        if (page) {
          // 若有相關頁面的資訊，則導向該頁面
          window.location.href = page.link; // 使用正確的屬性名稱 "link"
          break; // 可選：如果只想跳轉到第一個相關頁面，可以在這裡終止迴圈
        }
      }
    } else {
      // 若無相關內容，顯示相應的訊息或執行其他動作
      console.log('找不到相關內容');
    }
  });