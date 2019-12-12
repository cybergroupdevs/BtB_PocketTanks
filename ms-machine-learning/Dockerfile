# this dockerfile is used for product deployments
FROM ubuntu:16.04

LABEL maintainer "Sahil Sharma <sahil.sharma071997@gmail.com>"

COPY config.json app/config.json
COPY ms-machine-learning/requirements.txt app/requirements.txt

RUN apt-get update
RUN apt-get install poppler-utils -y
RUN apt-get update

# To solve add-apt-repository : command not found
RUN apt-get -y install software-properties-common

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

CMD ["/sbin/my_init"]
# install python 3.6
RUN apt-get install python3
RUN apt-get update
RUN apt-get install curl
RUN curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
RUN python3 get-pip.py

RUN pip install -r app/requirements.txt

COPY ms-machine-learning/ /app
WORKDIR /app

# for the flask config
ENV FLASK_ENV=prod

RUN [ "python3", "-c", "import nltk; nltk.download('stopwords'); nltk.download('punkt'); nltk.download('wordnet')" ]

EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "src.wsgi:app"]
