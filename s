[1mdiff --cc config.json[m
[1mindex 697d588,f3d1986..0000000[m
[1m--- a/config.json[m
[1m+++ b/config.json[m
[36m@@@ -10,7 -10,7 +10,8 @@@[m
          "ML" : {[m
              "IP" : "0.0.0.0",[m
              "PORT" : "5002",[m
[31m-             "PREFIX" : "/api/ml/v0.1"[m
[31m -            "PREFIX" : "/api/ml/"[m
[32m++            "PREFIX" :  "/api/ml/"[m
          }[m
      }[m
  }[m
[32m++[m
[1mdiff --cc ms-machine-learning/src/__init__.py[m
[1mindex 064559b,3f3fe65..0000000[m
[1m--- a/ms-machine-learning/src/__init__.py[m
[1m+++ b/ms-machine-learning/src/__init__.py[m
