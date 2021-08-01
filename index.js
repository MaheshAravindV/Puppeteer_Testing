const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

(async () => {
  const browser = await puppeteer.launch({headless : false})

  try{
    const page = await browser.newPage()
    await page.goto('https://tng3.tce.edu/login',{waitUntil:'networkidle2'})
    const login = await page.$$('.input')
    console.log('Logging in!')
    await login[0].type('dhatshaeni')
    await login[1].type('dhatshu2002')
    await page.click('.btn')
    await sleep(1000)
    await page.goto('https://tng3.tce.edu/student_course_exit_survey/semesters/9/courses')
    await sleep(1000)
    console.log('Clickity clackity')
    while(true){
      await sleep(100)
      await page.evaluate(()=>{ 
        [...document.querySelectorAll('*')].map(ele => { if(ele.textContent === 'Pending') ele.click() })
      })
      await sleep(100)
      await page.evaluate(()=>{ 
        [...document.querySelectorAll('*')].map(ele => { if(ele.textContent === 'Excellent') ele.click() })
      })
      const buttons = await page.$$('.btn')
      buttons[0].click()
      await sleep(100)
      page.goBack()
    }
  }
  catch(err){
    await browser.close()
    void(0)
  } 
})();