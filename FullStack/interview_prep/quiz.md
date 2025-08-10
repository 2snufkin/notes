# Technical Interview Quiz - Software Engineer Position

## Instructions

Please answer each question to the best of your ability. Be honest about your experience level - this helps us create the most effective preparation plan.

---

## **Section 1: Backend Development**

### Junior Level (0-2 years experience)

**1.1 Java Basics**

```java
public class Main {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = new String("Hello");
        System.out.println(str1 == str2);
        System.out.println(str1.equals(str2));
    }
}
```

What will this code print and why?

the first print false since its not the smae object
the second true since i think equal is overide in the String class to return true if both the string are the same

**1.2 Quarkus Fundamentals**
What is Quarkus and how does it differ from traditional Spring Boot applications?
its a docker orinted framweork like spirng boot but its startup faster and more memory efficent

**1.3 General Backend**
What's the difference between a GET and POST HTTP request? When would you use each?
get is to get data frol the db Read operation and post is to Insert to the database . also can be used to update but for this operaiton put is better

### Mid Level (2-4 years experience)

**1.4 Java Concurrency**

```java
public class Worker implements Runnable {
    private final BlockingQueue<Integer> jobs;
    private final BlockingQueue<Integer> results;

    public Worker(BlockingQueue<Integer> jobs, BlockingQueue<Integer> results) {
        this.jobs = jobs;
        this.results = results;
    }

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                Integer job = jobs.take();
                Thread.sleep(1000);
                results.put(job * 2);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
```

Explain how this worker thread works and how you would use it in a main method.
Inever worked with threads as a dev . i dont know how it works and i need you to fill the gap and to teach me Threads in Java

**1.5 Quarkus REST API**
How would you implement a REST API endpoint that accepts JSON data and saves it to a database using Quarkus?
 i will use an anotation above the endpoint saying the it accept onlly JSON. i forgot the name of the annotation. then i will serilize the json into a java object and call the correct service to save it in the db

**1.6 Architecture**
What is the difference between monolithic and microservices architecture? What are the trade-offs?

microserivce can use diffrenct languages in the smae probject. every serivce can be program in its own language and can have its own database. in monolitic app we have normally one database and using one programing manguages
the trade fof is that microservice is more complex and maybe more easy to maintain

### Senior Level (4+ years experience)

**1.7 Java Performance**
How would you optimize this code for better performance?

the problem is in the loop, i will use  java api methods that is optmised like addAll or something else

```java
public List<String> processData(List<String> items) {
    List<String> result = new ArrayList<>();
    for (String item : items) {
        if (isValid(item)) {
            result.add(transform(item));
        }
    }
    return result;
}
```

**1.8 Quarkus Advanced**
How would you implement custom authentication and authorization in Quarkus? Walk through the implementation using JWT tokens.
I think i will use sprin security? i dont know if its the right answer, but i have never worked with jwt tokens. take it under consideration when tailoring the plan fo enechung my knowledge 

**1.9 System Design**
Design a URL shortening service. What components would you need? How would you handle scale?
again i have no knoledge on the subject let alone i dont know what is shortning service and scale. nor how to do it 

---

## **Section 2: Frontend Development**

### Junior Level

**2.1 TypeScript Basics**

```typescript
interface User {
    id: number;
    name: string;
    email?: string;
}

function getUser(id: number): User {
    // implementation
     user User()
}
```

What does the `?` mean in the interface? How would you handle the optional email field? 
the ? means its optional i can . for hanfdling it i can return it only if exists

the problem i have: since i do python and java but have knoledge in js and ts , i mix the synatx; i forgot  how to create objects and uses interface in ts and js. i need a refreshemnt

**2.2 React Fundamentals**
What are React hooks? Explain useState and useEffect with examples.
usestate: talling to react to track a var and update the ui when it changes

useEffect: used for opersation with side effects, for example fetching api
react hooks are kind of event listtners that react listen to them? or maybe point in the components lifecycle?

**2.3 Ionic**
What's the difference between a regular React app and an Ionic app?
iconic is for android and IOS (apple) and react is for web app

### Mid Level

**2.4 TypeScript Advanced**

```typescript
type ButtonProps = {
    variant: 'primary' | 'secondary';
    size: 'small' | 'medium' | 'large';
    onClick: (event: React.MouseEvent) => void;
    children: React.ReactNode;
}
```

How would you create a reusable Button component with these props?

i  am bugging since ifdont know what type is 

**2.5 React State Management**
When would you use Context API vs Redux vs local state? Give examples.
 i knowhtat redux is for more compex state managment and context api its something that delviered with react

**2.6 Performance**
How would you optimize a React component that renders a large list of items?
pagination

### Senior Level

**2.7 TypeScript Generics**

```typescript
function createApiClient<T>(baseUrl: string): {
    get: (id: string) => Promise<T>;
    post: (data: Partial<T>) => Promise<T>;
    put: (id: string, data: Partial<T>) => Promise<T>;
    delete: (id: string) => Promise<void>;
}
```

Implement this generic API client.
i dont know whow to do so 

**2.8 React Architecture**
Design a component architecture for a complex dashboard with multiple widgets, real-time updates, and user preferences.
i dont know how to do it 

**2.9 Mobile Development**
How would you handle offline functionality in an Ionic app? What challenges would you face? i know that there is the notion of progressive app or something like this that can be used offline  btut i dont know hows to do it in ionic

---

## **Section 3: DevOps & Cloud**

### Junior Level

**3.1 Docker**
What is Docker and why is it useful? Write a simple Dockerfile for a Node.js application.
i dont know how to write a docker file but its used as a container that hold all the app depdencies to prevent the problem of : it works on my machine

**3.2 Kubernetes Basics**
What is a Pod in Kubernetes? How does it differ from a container? never worked with Kubernetes

**3.3 GCP Fundamentals**
What are the main services in Google Cloud Platform? When would you use Compute Engine vs App Engine?
i know that they have 2 types of db  and  analytics 

### Mid Level

**3.4 Docker Advanced**
How would you optimize a Docker image for production? What are multi-stage builds?
i wil lcache when possible

**3.5 Kubernetes Deployment**
Write a Kubernetes deployment YAML for a web application with 3 replicas and health checks.
i dont know how

**3.6 Google PubSub**
How does Google PubSub work? What are the main components and how do they interact? dont know 

### Senior Level

**3.7 Kubernetes Architecture**
Design a Kubernetes cluster architecture for a high-availability application. Include ingress, services, and storage considerations.

**3.8 gRPC**
Compare gRPC with REST APIs. When would you choose one over the other? How would you implement a gRPC service?

**3.9 Event-Driven Architecture**
Design an event-driven system using Google PubSub. How would you handle message ordering, retries, and dead letter queues?

i dont know how to answer all of the questions above 3.7 3.8 3.9

---

## **Section 4: Problem Solving & Debugging**

### Junior Level

**4.1 Debugging**
You have a web application that's running slowly. What steps would you take to identify the bottleneck?

i wil lexamine hte logs, if its on development i will exist debuf mode since it slow the app or i will remove all the debug points
but mostly i wil lexamine hte log

**4.2 Code Review**
Review this code and identify potential issues:
there caan be an issue with the number of iterations it can be inforior or equal to items.length

```javascript
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}
```

### Mid Level

**4.3 System Debugging**
Your production application is experiencing intermittent 500 errors. How would you debug this issue?
500 is the server , i dont faimiliar wit hthe word intermittent. 

**4.4 Performance Optimization**
A database query is taking 10 seconds to execute. How would you approach optimizing it?
i may put indexes

### Senior Level

**4.5 Distributed System Debugging**
You have a microservices architecture where requests are timing out. How would you trace and debug the issue? i iwll examine the log, i will test with postman

**4.6 Scalability**
Your application is experiencing high latency under load. How would you identify and resolve the bottlenecks?
i will figure out if its the resources (i need more memory, better server) or the app and then i will paproch the source of the problem

---

## **Section 5: Practical Coding**

### Junior Level

**5.1 Simple API**
Create a simple REST API endpoint that returns a list of users. Use any language/framework you're comfortable with.

@Request(type="GET")
public List<UserDTO> getUser(){

// cal the service

List<UserDTO> users = userService.getUsers();

return users;

}

1. i lack the annotations, they are worng, i want ted to do iit in springboot 
   
   2. i assume the the service method wil lreturn a dto, i dotn know if its its reposnability

### Mid Level

**5.2 Data Processing**
Write a function that processes a stream of data, applies transformations, and handles errors gracefully.

in java we have STreams

i forgot how to work with them, i will need to be guided

### Senior Level

**5.3 Feature Implementation**
Design and implement a feature that allows users to upload files, process them asynchronously, and receive notifications when complete.

lets do it in python

def uploadfile():

// get the file

// process async using fast api
// notification with jinja message

i dont know how to do it in java and doestn have the epxertice to write it from zero in python

---

## **Self-Assessment**

Please rate your confidence level (1-5) in each area:

- Backend Development (Go/Java): __2_
- Frontend Development (TypeScript/React/Ionic): __1_
- DevOps & Cloud (Docker/K8s/GCP): __0_
- System Design: __0_
- Problem Solving: __3_

**Total years of professional experience:** ___

**Areas you'd like to focus on most:** ___ 