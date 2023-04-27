
    const handle = 'v1p3r_jr';

    const api_url = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=100000`;

    fetch(api_url)
      .then(response => response.json())
      .then(data => {

        const tags = {};
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
          }
        
        }


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

      })
      .catch(error => console.error(error));
