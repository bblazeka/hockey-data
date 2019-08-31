# Prediction of results using ML .NET #

## WARNING: Currently updated !!!

Applying [ML.NET](https://dotnet.microsoft.com/apps/machinelearning-ai/ml-dotnet), a machine learning library by .NET Foundation, in prediction of sport results. Currently implemented to predict results of games in National Hockey League.

## Currently implemented functionalities

- [x] **Predict result of games**

After a model is trained for a certain period of time, prediction of results of games in a certain period of time is possible (all data is fetched from API). There is also a possibility to predict results of games with manually inserted data.

- [x] **Prediction of standings after games played in given time period** (useful for prediction of standings after the season)

This is basically an extension of previous functionality, with the main difference being that output are not results, but a table. User can get a prediction of final standings after complete season of games.

- [x] **Validate prediction**

Returns the output of Classification.Evaluation method (implemented in ML .NET library) for the trained model. Available data contains LogLoss, LogLossReduction, MicroAccuracy and MacroAccuracy.


## Experimental validation
No real formal methods of validation implemented yet, but (on a superficial level) both tests were run the prediction for NHL season 2018/2019, trained on season 2017/2018.
#### Game prediction precision 
*NOTE: Implemented using ML .NET's prediction evaluation method*
- binary prediction (only W or L) had accuracy (micro and macro) around 0,63
- multi class prediction (W, OTW, OTL and L) had Micro accuracy around 0,49 and Macro accuracy around 0,37
#### Precision of seasonal prediction
- top team won the title in the real league

## Architecture
Currently consists of projects: Server, Prediction library and Test.

## Links
Fetching data from publicly available NHL API with help of documentation: https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md

## Future improvements

- [ ] Use Yahoo Sports API
- [ ] Add support for other sports

## Previously

### Windows desktop application made to apply Naive Bayes Classifier on sport results

Application of Bayes Classifier in Analysis of Sport Results

Subject of this desktop application is naive Bayes classifier. It implements Bayes classifier method on predicting match outcome based on a given match database. Using the interactive interface, user sets up match and receives the most likely winner.

Additional functionality is the weather conditions prediction.
