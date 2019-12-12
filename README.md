# BtB_PocketTanks
Repo for Social Media Analysis tool built for Hackathon.

Multiplatform Social Media management tool.

Gives insights into:-

Differnent KPIs ( reach, likes, comments etc.).
Sentiment analysis on all the posts and comments using Machine Learning.
Trend analysis on how the social media handle is performing w.r.t time ( monthly, weekly basis etc. ).


## Installation and Usage 💡

Clone this repo and switch to develop branch ( will be merging into master once some issues are resolved. )

then navigate into specific directory of Microservice to start it


### ms-dashboard
```
npm i
npm start
```


### ms-analytics
PM Sahil or Nitesh on teams for the .env file for the secret keys to run the server
```
npm i
node server.js
```


### ms-machine-learning
from the root directory of the repo
run:
```
sudo docker build -t btb-ms-ml:latest -f ms-machine-learning/Dockerfile .

sudo docker run -p 5000:5000 btb-ms-ml:latest
```

## Built with 🔧 ( Microservices with the technologies used and some open source packages)

------ Dashboard ---------
* [Angular](https://angular.io/)
* [Material Design](https://material.angular.io/)
* [ChartJs](https://www.chartjs.org/)
* [D3](https://d3js.org/)

------ Analytics ---------
* [NodeJS](https://nodejs.org/)
* [Redis](https://redis.io/)

------ Machine Learning ---------
* [Flask](https://palletsprojects.com/p/flask/)
* [SkLearn](https://scikit-learn.org/stable/index.html)

------ Database ---------
* [MonogDB](https://www.mongodb.com/)
