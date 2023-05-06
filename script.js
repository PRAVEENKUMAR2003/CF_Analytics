// const { Chart } = require("chart.js");

console.log("SCRIPT.jS FILE loaded");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let handle1 = params.handle; // "some_value"
console.log(handle1);

// const displayCF = () => {
  console.log("DisplayCF method executed")
  // const handle = document.getElementById('input-handle').value;
  // console.log(handle);

  const api_url = `https://codeforces.com/api/user.status?handle=${handle1}&from=1&count=100000`;
  
  fetch(api_url)
  .then(response => response.json())
  .then(data => {
    
    const tags = {};
        const language = {};
        const verdicts = {};
        const ratings = {};
        // Levels of the user
        let problem_count = {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0,
        };
        
        for (let submission of data.result) {
          if (submission.verdict === 'OK') {

            //Tags of the user
            submission.problem.tags.forEach((tag) => {
              tags[tag] = (tags[tag] || 0) + 1;
            });
            
            //Levels of the user
            let problem_index = submission.problem.index;
            if (problem_index in problem_count) {
              problem_count[problem_index]++;
            }
            
            //Ratings of the user
            const rt = submission.problem.rating;
            if(ratings[rt])
            ratings[rt]++;
            else
            ratings[rt] = 1;
            
          }
          //Language of the user
          const pl = submission.programmingLanguage;
          if(language[pl])
          language[pl]++;
          else
          language[pl] = 1;
          
          //Verdicts of the user
          const vr = submission.verdict;
          if(verdicts[vr])
          verdicts[vr]++;
          else
          verdicts[vr] = 1;
          

        
        }
        console.log(language);
        
        
        let labels = Object.keys(problem_count);
        let bata = Object.values(problem_count);
        
        let ctx = document.getElementById('level-chart').getContext('2d');
        
        let Levelchart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Problems Solved',
              data: bata,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });

        //Tags of the user
        
        let TagLabel = Object.keys(tags);
        let TagData = Object.values(tags);

        let cty = document.getElementById('tag-chart').getContext('2d');
        
        let TagChart = new Chart(cty, {
            type : 'doughnut',
            data : {
              labels: TagLabel,
              datasets: [{
                    label: 'Problems Solved',
                    data: TagData,
                    // backgroundColor: [
                    //   'rgba(255, 99, 132, 0.2)',
                    //   'rgba(54, 162, 235, 0.2)',
                    //   'rgba(255, 206, 86, 0.2)',
                    //   'rgba(75, 192, 192, 0.2)',
                    //   'rgba(153, 102, 255, 0.2)',
                    //   'rgba(255, 159, 64, 0.2)'
                    // ],
                    // borderColor: [
                    //   'rgba(255, 99, 132, 1)',
                    //   'rgba(54, 162, 235, 1)',
                    //   'rgba(255, 206, 86, 1)',
                    //   'rgba(75, 192, 192, 1)',
                    //   'rgba(153, 102, 255, 1)',
                    //   'rgba(255, 159, 64, 1)'
                    // ],
                    // borderWidth: 1
                  }]


            },
          });

        //Language of the user
        let LangLabel = Object.keys(language);
        let LangData = Object.values(language);
        
        let ctz = document.getElementById('lang-chart').getContext('2d');
        
        let LangChart = new Chart(ctz, {
            type : 'pie',
            data : {
              labels: LangLabel,
                datasets: [{
                  // label: 'Problems Solved',
                    data: LangData,
                    radius: '60%',
                    // borderAlign: 'inner',
                    // animateScale: true,
                    
                    // backgroundColor: [
                      //   'rgba(255, 99, 132, 0.2)',
                    //   'rgba(54, 162, 235, 0.2)',
                    //   'rgba(255, 206, 86, 0.2)',
                    //   'rgba(75, 192, 192, 0.2)',
                    //   'rgba(153, 102, 255, 0.2)',
                    //   'rgba(255, 159, 64, 0.2)'
                    // ],
                    // borderColor: [
                    //   'rgba(255, 99, 132, 1)',
                    //   'rgba(54, 162, 235, 1)',
                    //   'rgba(255, 206, 86, 1)',
                    //   'rgba(75, 192, 192, 1)',
                    //   'rgba(153, 102, 255, 1)',
                    //   'rgba(255, 159, 64, 1)'
                    // ],
                    // borderWidth: 1
                  }]


                },
        });

        //Verdicts of the user
        
        let VerdictLabel = Object.keys(verdicts);
        let VerdictData = Object.values(verdicts);
        
        let ctty = document.getElementById('verdict-graph').getContext('2d');
        
        let VerdChart = new Chart(ctty, {
          type : 'pie',
          data : {
            labels : VerdictLabel,
            datasets : [{
              data : VerdictData,
              radius : '64%',
            }]
          }
        });

        //Problem rating of user

        let RatingLabel = Object.keys(ratings);
        let RatingData = Object.values(ratings);

        let ctte = document.getElementById('rating-graph').getContext('2d');

        let RatingChart = new Chart(ctte, {
          type : 'bar',
          data : {
            labels : RatingLabel,
            datasets : [{
              data : RatingData,
              label : 'Problems Solved',
            }]
          }
        });


        
        
      })
      .catch(error => console.error(error));

    // }