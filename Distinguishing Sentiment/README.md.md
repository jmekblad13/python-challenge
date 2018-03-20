
# Analysis

Observation 1 - I ran this analysis late Monday night and again on Tuesday.  All five news organizations had negative results for their aggregate figures in the bar chart.  I would like to run the analysis a couple more days, but my initial results suggest that new organizations Tweet more negative comments than positive.
Observation 2 - I believe that the aggregate amounts in the bar chart match up with what I can see in the scatter plot.  One additional observation I had of the scatter plot is that the negative aggregate amounts are more likely due to a higher number of negative tweets than positive tweets, rather than tweets that are very negative. 
Observation 3 - At the same time, the aggregate sentiment analysis on tweets by CBS are less negative than any other news outlet.  This may be because their orange plots show up as some of the most positive tweets on my scatter plot.

# News Mood


```python
# Dependencies
import tweepy
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import pprint as pprint
from datetime import datetime

# Import and Initialize Sentiment Analyzer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()

# Twitter API Keys
from config import (consumer_key, 
                    consumer_secret, 
                    access_token, 
                    access_token_secret)

# Setup Tweepy API Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())
```


```python
# Target User Accounts
bbc_user = "@BBCNews"
cbs_user = "@CBSNews"
cnn_user = "@CNN"
fox_user = "@FoxNews"
nyt_user = "@nytimes"

news = [bbc_user, cbs_user, cnn_user, fox_user, nyt_user]

# Variables for holding sentiments
bbc_sentiments = []
cbs_sentiments = []
cnn_sentiments = []
fox_sentiments = []
nyt_sentiments = []
#positive_list = []
#negative_list = []
#neutral_list = []

for station in news:
    counter = 1
    # Loop through 5 pages of tweets (total 100 tweets per user account)
    for x in range(5):

        # Get all tweets from home feed
        public_tweets = api.user_timeline(station,page=x+1)

        # Loop through all tweets
        for tweet in public_tweets:

            # Run Vader Analysis on each tweet
            results = analyzer.polarity_scores(tweet["text"])
            content = tweet["text"]
            compound = results["compound"]
            pos = results["pos"]
            neu = results["neu"]
            neg = results["neg"]

            # Add each value to the appropriate list
            if station == bbc_user:
                bbc_sentiments.append({"Date": tweet["created_at"],
                            "Source":station,
                           "Tweet": content,          
                           "Compound": compound,
                           "Positive": pos,
                           "Negative": neu,
                           "Neutral": neg,
                           "Tweets Ago": counter})
                counter = counter + 1
                
            if station == cbs_user:
                cbs_sentiments.append({"Date": tweet["created_at"],
                            "Source":station,
                           "Tweet": content,          
                           "Compound": compound,
                           "Positive": pos,
                           "Negative": neu,
                           "Neutral": neg,
                           "Tweets Ago": counter})
                counter = counter + 1
                
            if station == cnn_user:
                cnn_sentiments.append({"Date": tweet["created_at"],
                            "Source":station,
                           "Tweet": content,          
                           "Compound": compound,
                           "Positive": pos,
                           "Negative": neu,
                           "Neutral": neg,
                           "Tweets Ago": counter})
                counter = counter + 1
                
            if station == fox_user:
                fox_sentiments.append({"Date": tweet["created_at"],
                            "Source":station,
                           "Tweet": content,          
                           "Compound": compound,
                           "Positive": pos,
                           "Negative": neu,
                           "Neutral": neg,
                           "Tweets Ago": counter})
                counter = counter + 1
                
            if station == nyt_user:
                nyt_sentiments.append({"Date": tweet["created_at"],
                            "Source":station,
                           "Tweet": content,          
                           "Compound": compound,
                           "Positive": pos,
                           "Negative": neu,
                           "Neutral": neg,
                           "Tweets Ago": counter})
                counter = counter + 1
```


```python
bbc_sentiments_pd = pd.DataFrame.from_dict(bbc_sentiments)
cbs_sentiments_pd = pd.DataFrame.from_dict(cbs_sentiments)
cnn_sentiments_pd = pd.DataFrame.from_dict(cnn_sentiments)
fox_sentiments_pd = pd.DataFrame.from_dict(fox_sentiments)
nyt_sentiments_pd = pd.DataFrame.from_dict(nyt_sentiments)
combined_sentiments_pd = bbc_sentiments_pd
combined_sentiments_pd = combined_sentiments_pd.append(cbs_sentiments_pd, ignore_index=True)
combined_sentiments_pd = combined_sentiments_pd.append(cnn_sentiments_pd, ignore_index=True)
combined_sentiments_pd = combined_sentiments_pd.append(fox_sentiments_pd, ignore_index=True)
combined_sentiments_pd = combined_sentiments_pd.append(nyt_sentiments_pd, ignore_index=True)
```


```python
#save data frame and print preview
combined_sentiments_pd.to_csv("twitterData.csv", index=False, header=True)
combined_sentiments_pd
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Compound</th>
      <th>Date</th>
      <th>Negative</th>
      <th>Neutral</th>
      <th>Positive</th>
      <th>Source</th>
      <th>Tweet</th>
      <th>Tweets Ago</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-0.8750</td>
      <td>Tue Mar 20 18:46:10 +0000 2018</td>
      <td>0.444</td>
      <td>0.556</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Man guilty of hate crime for filming pug's 'Na...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-0.5574</td>
      <td>Tue Mar 20 18:40:36 +0000 2018</td>
      <td>0.847</td>
      <td>0.153</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>RAF spokesman confirms an engineer from the Re...</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.2144</td>
      <td>Tue Mar 20 18:27:04 +0000 2018</td>
      <td>0.598</td>
      <td>0.236</td>
      <td>0.166</td>
      <td>@BBCNews</td>
      <td>RT @BBCBreaking: Engineer killed but pilot sur...</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.0000</td>
      <td>Tue Mar 20 18:07:01 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Jennie Formby named as Labour's new general se...</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-0.1893</td>
      <td>Tue Mar 20 17:53:09 +0000 2018</td>
      <td>0.932</td>
      <td>0.068</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>RT @bbcweather: Cold snap or snow at Easter? T...</td>
      <td>5</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.0000</td>
      <td>Tue Mar 20 17:46:03 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Katie Boyle: Former TV host dies aged 91 https...</td>
      <td>6</td>
    </tr>
    <tr>
      <th>6</th>
      <td>-0.3818</td>
      <td>Tue Mar 20 17:46:03 +0000 2018</td>
      <td>0.809</td>
      <td>0.191</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Stephen Hawking's ashes to be interred near Si...</td>
      <td>7</td>
    </tr>
    <tr>
      <th>7</th>
      <td>-0.2960</td>
      <td>Tue Mar 20 16:44:54 +0000 2018</td>
      <td>0.909</td>
      <td>0.091</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>RT @BBCBreaking: Ashes of Professor Stephen Ha...</td>
      <td>8</td>
    </tr>
    <tr>
      <th>8</th>
      <td>-0.4019</td>
      <td>Tue Mar 20 16:42:55 +0000 2018</td>
      <td>0.870</td>
      <td>0.130</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>RT @BBCWalesNews: Red Arrows crash eyewitness ...</td>
      <td>9</td>
    </tr>
    <tr>
      <th>9</th>
      <td>-0.5994</td>
      <td>Tue Mar 20 15:07:58 +0000 2018</td>
      <td>0.698</td>
      <td>0.302</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Sophie Lionnet death: Nanny 'pushed to confirm...</td>
      <td>10</td>
    </tr>
    <tr>
      <th>10</th>
      <td>0.4767</td>
      <td>Tue Mar 20 14:50:45 +0000 2018</td>
      <td>0.707</td>
      <td>0.092</td>
      <td>0.201</td>
      <td>@BBCNews</td>
      <td>RT @VictoriaLIVE: Actor Michael Sheen says he'...</td>
      <td>11</td>
    </tr>
    <tr>
      <th>11</th>
      <td>-0.8020</td>
      <td>Tue Mar 20 14:50:34 +0000 2018</td>
      <td>0.455</td>
      <td>0.545</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Exeter university students suspended over raci...</td>
      <td>12</td>
    </tr>
    <tr>
      <th>12</th>
      <td>0.0000</td>
      <td>Tue Mar 20 14:39:31 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Aircraft crashes at RAF Valley on Anglesey htt...</td>
      <td>13</td>
    </tr>
    <tr>
      <th>13</th>
      <td>0.0000</td>
      <td>Tue Mar 20 14:31:44 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>RT @BBCEngland: Ed Sheeran wants to build a pr...</td>
      <td>14</td>
    </tr>
    <tr>
      <th>14</th>
      <td>-0.2960</td>
      <td>Tue Mar 20 14:20:03 +0000 2018</td>
      <td>0.885</td>
      <td>0.115</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>#DeleteFacebook is trending after Cambridge An...</td>
      <td>15</td>
    </tr>
    <tr>
      <th>15</th>
      <td>0.0000</td>
      <td>Tue Mar 20 14:16:25 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Cambridge Analytica: Committee calls for Mark ...</td>
      <td>16</td>
    </tr>
    <tr>
      <th>16</th>
      <td>0.0000</td>
      <td>Tue Mar 20 13:58:06 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>UK is "disappointed" EU will continue to set f...</td>
      <td>17</td>
    </tr>
    <tr>
      <th>17</th>
      <td>0.3182</td>
      <td>Tue Mar 20 13:44:53 +0000 2018</td>
      <td>0.777</td>
      <td>0.000</td>
      <td>0.223</td>
      <td>@BBCNews</td>
      <td>Access to work: Funding increase for disabled ...</td>
      <td>18</td>
    </tr>
    <tr>
      <th>18</th>
      <td>0.6124</td>
      <td>Tue Mar 20 13:21:25 +0000 2018</td>
      <td>0.739</td>
      <td>0.000</td>
      <td>0.261</td>
      <td>@BBCNews</td>
      <td>What is it like to grow up with HIV? Meet thre...</td>
      <td>19</td>
    </tr>
    <tr>
      <th>19</th>
      <td>0.0000</td>
      <td>Tue Mar 20 12:40:15 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Prince Harry and Meghan Markle choose their we...</td>
      <td>20</td>
    </tr>
    <tr>
      <th>20</th>
      <td>-0.7430</td>
      <td>Tue Mar 20 11:38:12 +0000 2018</td>
      <td>0.559</td>
      <td>0.441</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Telford abuse victim let down by authorities, ...</td>
      <td>21</td>
    </tr>
    <tr>
      <th>21</th>
      <td>0.0000</td>
      <td>Tue Mar 20 11:25:08 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Grenfell Tower: Council spends £21m keeping su...</td>
      <td>22</td>
    </tr>
    <tr>
      <th>22</th>
      <td>0.0772</td>
      <td>Tue Mar 20 11:19:38 +0000 2018</td>
      <td>0.843</td>
      <td>0.000</td>
      <td>0.157</td>
      <td>@BBCNews</td>
      <td>Cambodia: Briton given jail sentence over 'por...</td>
      <td>23</td>
    </tr>
    <tr>
      <th>23</th>
      <td>0.0000</td>
      <td>Tue Mar 20 10:55:04 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Human remains found at 'cluttered' Aberaeron h...</td>
      <td>24</td>
    </tr>
    <tr>
      <th>24</th>
      <td>-0.6124</td>
      <td>Tue Mar 20 10:55:04 +0000 2018</td>
      <td>0.583</td>
      <td>0.417</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>Spy poisoning: Russian diplomats prepare to le...</td>
      <td>25</td>
    </tr>
    <tr>
      <th>25</th>
      <td>-0.4767</td>
      <td>Tue Mar 20 10:13:21 +0000 2018</td>
      <td>0.607</td>
      <td>0.279</td>
      <td>0.113</td>
      <td>@BBCNews</td>
      <td>Motoring firm says bad weather means many loca...</td>
      <td>26</td>
    </tr>
    <tr>
      <th>26</th>
      <td>0.0000</td>
      <td>Tue Mar 20 10:08:23 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>RT @BBCBreaking: FBI is investigating a blast ...</td>
      <td>27</td>
    </tr>
    <tr>
      <th>27</th>
      <td>0.0000</td>
      <td>Tue Mar 20 09:39:21 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>UK inflation rate falls to 2.7% https://t.co/H...</td>
      <td>28</td>
    </tr>
    <tr>
      <th>28</th>
      <td>0.0000</td>
      <td>Tue Mar 20 09:38:12 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>RT @BBCBreaking: UK inflation fell to 2.7% in ...</td>
      <td>29</td>
    </tr>
    <tr>
      <th>29</th>
      <td>-0.4019</td>
      <td>Tue Mar 20 08:39:43 +0000 2018</td>
      <td>0.787</td>
      <td>0.213</td>
      <td>0.000</td>
      <td>@BBCNews</td>
      <td>RT @BBCPolitics: Working dads lose out in work...</td>
      <td>30</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>470</th>
      <td>0.0000</td>
      <td>Tue Mar 20 06:33:04 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>RT @nytimesworld: President Bashar al-Assad of...</td>
      <td>71</td>
    </tr>
    <tr>
      <th>471</th>
      <td>-0.4404</td>
      <td>Tue Mar 20 06:18:45 +0000 2018</td>
      <td>0.756</td>
      <td>0.244</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>Can Wikipedia bear the burden of fact-checking...</td>
      <td>72</td>
    </tr>
    <tr>
      <th>472</th>
      <td>0.4404</td>
      <td>Tue Mar 20 06:02:03 +0000 2018</td>
      <td>0.818</td>
      <td>0.000</td>
      <td>0.182</td>
      <td>@nytimes</td>
      <td>The shopping gems in Belfast's lively city cen...</td>
      <td>73</td>
    </tr>
    <tr>
      <th>473</th>
      <td>0.4588</td>
      <td>Tue Mar 20 05:32:05 +0000 2018</td>
      <td>0.705</td>
      <td>0.099</td>
      <td>0.196</td>
      <td>@nytimes</td>
      <td>RT @UpshotNYT: New research shows that even bl...</td>
      <td>74</td>
    </tr>
    <tr>
      <th>474</th>
      <td>-0.1027</td>
      <td>Tue Mar 20 05:02:04 +0000 2018</td>
      <td>0.755</td>
      <td>0.132</td>
      <td>0.113</td>
      <td>@nytimes</td>
      <td>Facebook’s chief information security officer,...</td>
      <td>75</td>
    </tr>
    <tr>
      <th>475</th>
      <td>0.0000</td>
      <td>Tue Mar 20 04:47:04 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>RT @kimseverson: Stuffed ham is a dying art. O...</td>
      <td>76</td>
    </tr>
    <tr>
      <th>476</th>
      <td>0.0000</td>
      <td>Tue Mar 20 04:32:06 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>Facebook’s open platform for third-party apps ...</td>
      <td>77</td>
    </tr>
    <tr>
      <th>477</th>
      <td>0.4215</td>
      <td>Tue Mar 20 04:17:05 +0000 2018</td>
      <td>0.882</td>
      <td>0.000</td>
      <td>0.118</td>
      <td>@nytimes</td>
      <td>RT @marclacey: Can you believe it’s been six m...</td>
      <td>78</td>
    </tr>
    <tr>
      <th>478</th>
      <td>-0.5106</td>
      <td>Tue Mar 20 04:02:02 +0000 2018</td>
      <td>0.788</td>
      <td>0.212</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>As President Trump openly discussed firing one...</td>
      <td>79</td>
    </tr>
    <tr>
      <th>479</th>
      <td>-0.5994</td>
      <td>Tue Mar 20 03:47:01 +0000 2018</td>
      <td>0.776</td>
      <td>0.224</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>Mississippi has imposed a ban on abortions aft...</td>
      <td>80</td>
    </tr>
    <tr>
      <th>480</th>
      <td>0.0000</td>
      <td>Tue Mar 20 03:32:03 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>RT @kevinroose: New by me: Facebook’s open pla...</td>
      <td>81</td>
    </tr>
    <tr>
      <th>481</th>
      <td>0.2023</td>
      <td>Tue Mar 20 03:17:06 +0000 2018</td>
      <td>0.583</td>
      <td>0.175</td>
      <td>0.242</td>
      <td>@nytimes</td>
      <td>4 easy ways to cut down your sugar intake http...</td>
      <td>82</td>
    </tr>
    <tr>
      <th>482</th>
      <td>-0.3400</td>
      <td>Tue Mar 20 03:02:05 +0000 2018</td>
      <td>0.902</td>
      <td>0.098</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>RT @nytmike: Dowd wants to quit. Trump’s talki...</td>
      <td>83</td>
    </tr>
    <tr>
      <th>483</th>
      <td>-0.2023</td>
      <td>Tue Mar 20 02:47:07 +0000 2018</td>
      <td>0.913</td>
      <td>0.087</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>The brother of Nikolas Cruz was charged with t...</td>
      <td>84</td>
    </tr>
    <tr>
      <th>484</th>
      <td>0.0000</td>
      <td>Tue Mar 20 02:32:04 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>Audit your Facebook apps, audit your Facebook ...</td>
      <td>85</td>
    </tr>
    <tr>
      <th>485</th>
      <td>0.0000</td>
      <td>Tue Mar 20 02:17:06 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>Claire’s, the teen jewelry chain known for its...</td>
      <td>86</td>
    </tr>
    <tr>
      <th>486</th>
      <td>-0.6369</td>
      <td>Tue Mar 20 02:02:02 +0000 2018</td>
      <td>0.512</td>
      <td>0.346</td>
      <td>0.142</td>
      <td>@nytimes</td>
      <td>The Supreme Court rejected an emergency reques...</td>
      <td>87</td>
    </tr>
    <tr>
      <th>487</th>
      <td>0.1280</td>
      <td>Tue Mar 20 01:47:04 +0000 2018</td>
      <td>0.830</td>
      <td>0.076</td>
      <td>0.094</td>
      <td>@nytimes</td>
      <td>RT @sheeraf: To be clear: We spoke to seven cu...</td>
      <td>88</td>
    </tr>
    <tr>
      <th>488</th>
      <td>-0.5994</td>
      <td>Tue Mar 20 01:32:03 +0000 2018</td>
      <td>0.795</td>
      <td>0.205</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>A U.S. soldier in Niger warned that his unit w...</td>
      <td>89</td>
    </tr>
    <tr>
      <th>489</th>
      <td>0.0000</td>
      <td>Tue Mar 20 01:17:03 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>Evening Briefing: Here's what you need to know...</td>
      <td>90</td>
    </tr>
    <tr>
      <th>490</th>
      <td>0.2732</td>
      <td>Tue Mar 20 01:00:19 +0000 2018</td>
      <td>0.896</td>
      <td>0.000</td>
      <td>0.104</td>
      <td>@nytimes</td>
      <td>After we published an article on tipping and t...</td>
      <td>91</td>
    </tr>
    <tr>
      <th>491</th>
      <td>-0.2960</td>
      <td>Tue Mar 20 00:48:11 +0000 2018</td>
      <td>0.781</td>
      <td>0.152</td>
      <td>0.066</td>
      <td>@nytimes</td>
      <td>RT @sheeraf: Full story now up. Alex Stamos is...</td>
      <td>92</td>
    </tr>
    <tr>
      <th>492</th>
      <td>0.0000</td>
      <td>Tue Mar 20 00:32:02 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>At a conference on whale biology in 1971, a fe...</td>
      <td>93</td>
    </tr>
    <tr>
      <th>493</th>
      <td>0.0000</td>
      <td>Tue Mar 20 00:17:03 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>RT @nytopinion: Despite Facebook’s claims, eve...</td>
      <td>94</td>
    </tr>
    <tr>
      <th>494</th>
      <td>0.0000</td>
      <td>Tue Mar 20 00:02:05 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>Mary Outerbridge set up a tennis court in Stat...</td>
      <td>95</td>
    </tr>
    <tr>
      <th>495</th>
      <td>-0.8271</td>
      <td>Mon Mar 19 23:32:03 +0000 2018</td>
      <td>0.697</td>
      <td>0.303</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>New York City’s subway hit a new low in Januar...</td>
      <td>96</td>
    </tr>
    <tr>
      <th>496</th>
      <td>-0.5390</td>
      <td>Mon Mar 19 23:17:05 +0000 2018</td>
      <td>0.498</td>
      <td>0.302</td>
      <td>0.200</td>
      <td>@nytimes</td>
      <td>RT @KevinQ: The worst places for poor white ch...</td>
      <td>97</td>
    </tr>
    <tr>
      <th>497</th>
      <td>0.0000</td>
      <td>Mon Mar 19 23:02:04 +0000 2018</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>Evening Briefing: Here's what you need to know...</td>
      <td>98</td>
    </tr>
    <tr>
      <th>498</th>
      <td>-0.1027</td>
      <td>Mon Mar 19 22:44:07 +0000 2018</td>
      <td>0.766</td>
      <td>0.126</td>
      <td>0.108</td>
      <td>@nytimes</td>
      <td>RT @nicoleperlroth: NEW: Facebook's security o...</td>
      <td>99</td>
    </tr>
    <tr>
      <th>499</th>
      <td>-0.4215</td>
      <td>Mon Mar 19 22:34:00 +0000 2018</td>
      <td>0.872</td>
      <td>0.128</td>
      <td>0.000</td>
      <td>@nytimes</td>
      <td>Alex Stamos is said to be leaving Facebook aft...</td>
      <td>100</td>
    </tr>
  </tbody>
</table>
<p>500 rows × 8 columns</p>
</div>




```python
bbc_x = bbc_sentiments_pd["Tweets Ago"]
bbc_y = bbc_sentiments_pd["Compound"]
cbs_x = cbs_sentiments_pd["Tweets Ago"]
cbs_y = cbs_sentiments_pd["Compound"]
cnn_x = cnn_sentiments_pd["Tweets Ago"]
cnn_y = cnn_sentiments_pd["Compound"]
fox_x = fox_sentiments_pd["Tweets Ago"]
fox_y = fox_sentiments_pd["Compound"]
nyt_x = nyt_sentiments_pd["Tweets Ago"]
nyt_y = nyt_sentiments_pd["Compound"]

bbc_handle = plt.scatter(bbc_x, bbc_y, marker ='o', color='red', edgecolors="black", label=bbc_user, alpha=.5)
cbs_handle = plt.scatter(cbs_x, cbs_y, marker ='o', color='orange', edgecolors="black", label=cbs_user, alpha=.5)
cnn_handle = plt.scatter(cnn_x, cnn_y, marker ='o', color='yellow', edgecolors="black", label=cnn_user, alpha=.5)
fox_handle = plt.scatter(fox_x, fox_y, marker ='o', color='green', edgecolors="black", label=fox_user, alpha=.5)
nyt_handle = plt.scatter(nyt_x, nyt_y, marker ='o', color='blue', edgecolors="black", label=nyt_user, alpha=.5)

plt.legend(handles=[bbc_handle, cbs_handle, cnn_handle, fox_handle, nyt_handle], loc="best")

#plt.scatter(np.arange(len(nyt_compound_list)),
#         nyt_compound_list, marker="o", alpha=0.8)

# # Incorporate the other graph properties
now = datetime.now()
now = now.strftime("%Y-%m-%d %H:%M")
plt.title("Sentiment Analysis of Media Tweets ({})".format(now))
plt.ylabel("Tweet Polarity")
plt.xlabel("Tweets Ago")
plt.savefig("Twitter_News_Sentiment_Scatter_Plot.png")
plt.show()
```


![png](output_7_0.png)



```python
sentiment = [bbc_sentiments_pd["Compound"].mean(),cbs_sentiments_pd["Compound"].mean(),cnn_sentiments_pd["Compound"].mean(),fox_sentiments_pd["Compound"].mean(),nyt_sentiments_pd["Compound"].mean()]
x_axis = np.arange(0, len(news))
tick_locations = []
for x in x_axis:
    tick_locations.append(x + 0.4)

now = datetime.now()
now = now.strftime("%Y-%m-%d %H:%M")
plt.title("Overall Media Sentiment based on Twitter ({})".format(now))
plt.xlabel("News Source")
plt.ylabel("Tweet Polarity")

plt.xlim(-0.25, len(news))
plt.ylim(-.25, .25)

plt.bar(x_axis, sentiment, facecolor="red", alpha=0.75, align="edge")
plt.xticks(tick_locations, news)
plt.savefig("Twitter_News_Overall_Sentiment_Bar_Chart.png")
plt.show()
```


![png](output_8_0.png)

