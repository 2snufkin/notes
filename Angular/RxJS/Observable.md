# RxJS

## Subject
A subject emit values by calling the next() myself

## Observable
Streams of data
The observable wrap an external source and will emit values based on an external events/source like http request or a button event.
Has 3 methods that can be triggered, by the source thay are wrapping:
next(): it's not me who call the next() like in a Subject, it's an uncontroled event that does it.
error(): Failaure. It will cancel the observable. No other values will be sent in the future. 
complete(): Finish. The source call this method when no other values are to be expected

What the diffrent between an error and complete? in both of them no more values will be sent


## Observer
connect to an Observable via subscription and get inforemd on emited values.
Has 3 methods that can be triggered, by the source thay are wrapping:
next(): it's not me who call the next() like in a Subject, it's an uncontroled event that does it.
error(): Failaure. It will cancel the observable. No other values will be sent in the future. 
complete(): Finish. The source call this method when no other values are to be expected

## Subscription
connect the observer to the observable


## Operators
methods you put between the observer and the stream of data. You do something with the data after it was emited and before it arrives to the Observer.


### HTTP Example
We sent a request and the response arrived. We get a value. I subscribe to this obsevable and when a value is emited by the observable, the Observer.next() method is triggered. Everytime a value is emited the next() will be triggered. In the HTTP example, there is only one value, we don't get sequence of values. 


