// Hard code questions as javascript objects
var questions = [{question: "A vehicle should not send out visible smoke for more than:", 
                    answers: ["3 Seconds", "5 Seconds", "8 Seconds", "10 Seconds"],
                    correct: 3}, // Q0 d
                 {question: "To help you from being blinded by the headlights of an oncoming vehicle, what should you do?", 
                    answers: ["Look to the left side of the road", "Look the the right side of the road", 
                    "Look to the centre of the road", "Turn your headlights on high beam"],
                    correct: 0}, // Q1 a
                 {question: "How long should you indicate for before turing or chaning lanes?",
                    answers: ["At least 3 seconds", "Less than 2 seconds", "At least 10 seconds", 
                    "Immediatly before turning"],
                    correct: 0}, // Q2 a
                 {question: "When parking downhill on a steep road, what does the 'Road code' suggest that you should do?", 
                    answers: ["Make sure your park lights are on", "Turn your wheels towards the kerb and leave it in first gear or park", 
                    "Turn your wheels towards the kerb and leave it in reverse or park", "Lock your vehicle"],
                    correct: 2}, // Q3 c
                 {question: "What does a reflectorised triangle placed on the side of the road mean?", 
                    answers: ["There are road works ahead", "There is a breakdown ahead", "The road is closed", 
                    "Expect delays"], correct: 1}, // Q4 b
                 {question: "What does this sign mean?", 
                    answers: ["It is recommended to drive at this speed", "This is the minimum speed you can drive at",
                    "This is the maximum speed you can drive at", "There is a stop sign 100m ahead"],
                    correct: 2}, // Q5 c
                 {question: "What must you do at an intersection controlled by a Give Way sign?", 
                    answers: ["Give way to all vehicles, including those on a stop sign", "Come to a complete stop", 
                    "Give way to all vehicles, except those on a stop sign", "Give way to all vehicles on your right"],
                    correct: 2}, // Q6 c
                 {question: "What does a blue reflector (cat's eye) placed on the road mean?", 
                    answers: ["The left side of the road", "The centre of the road", "The right side of the road", "Fire Hydrant"],
                    correct: 3}, // Q7 d
                 {question: "What do these road markings mean?", 
                    answers: ["You should only enter the turning lane at the arrow", "No need to indicate", 
                    "All vehicles can make a u-turn at these road markings", 
                    "Drive straight over all road markings and turn right"], correct: 3}, // Q8 d
                 {question: "For what purpose can a vehicle use the flush median strip?", 
                    answers: ["To move into the traffic flow", "To park for 5 minutes only", "As a driving lane", 
                    "To unload goods or passengers"], correct: 0}, // Q9 a
                ];

// Global counters to keep track of the current question and how many answers the user got correct
var questionCounter = 0;
var correctAnswers = 0;
// Create array to store the questions the user got wrong
var incorrectAnswers = [];

// Switchs to the question section and begins the test
function startQuiz() {
   // Hide the start section and show the question section
   document.getElementById("start-section").style.display = "none";
   document.getElementById("question-section").style.display = "flex";
}

// Determine if the user selected a correct answer, and display the appropriate result page
function answerClick(result) {
   // Hide the question section
   document.getElementById("question-section").style.display = "none";
   // Show the result section
   document.getElementById("answer-result-section").style.display = "flex";

   // Determine if the user chose the correct answer
   var resultTitle = document.getElementById("answer-result-section-title");
   if(result == 1) { // User got the answer right
      resultTitle.textContent = "Correct!";
      // Increase the correct answers counter
      correctAnswers++;
   }
   else { // user got the answer wrong
      resultTitle.textContent = "Incorrect.";
      // Display the correct answer to the user
      document.getElementById("incorrect-result").style.display = "flex";
      // Add the answer to the list of incorrect answers
      incorrectAnswers.push(questionCounter);
   }

   // Increase the question counter
   questionCounter++;
}

// Hide the result section and show the question section again
function nextQuestion() {
   // Hide the result section
   var resultSection = document.getElementById("answer-result-section")
   resultSection.style.display = "none";

   // Check if that was the last question
   if(questionCounter < questions.length) {
      // Hide the incorrect answer section
      document.getElementById("incorrect-result").style.display = "none";

      // Update the data in the question view with the next question
      var q = questions[questionCounter];
      document.getElementById("counter").textContent = "Question " + (questionCounter + 1);
      document.getElementById("question").textContent = q.question;
      document.getElementById("image").setAttribute("src", "../../images/part2/" + questionCounter + ".jpg");

      // Remove the old answers
      var answerContainer = document.getElementById("answer-container");
      while(answerContainer.firstChild) {
         answerContainer.removeChild(answerContainer.lastChild);
      }

      // Add the new answers
      var c = 0;
      for(var i = 0; i < q.answers.length; i++) {
         // Check if the current answer is the correct answer
         if(i == q.correct) {
            c = 1;
            // Update the correct answer in the answer result section
            document.getElementById("correct-answer").textContent = q.answers[i];
         } else {
            c = 0;
         }

         // Create a button element
         var b = document.createElement("button");
         b.setAttribute("type", "button");
         b.setAttribute("onclick", "answerClick(" + c + ")");
         b.textContent = q.answers[i];

         // Add the button to the answer container
         answerContainer.appendChild(b);
      }

      // Show the question section
      document.getElementById("question-section").style.display = "flex";
   }
   // If the user has reached the end of the quiz, show the final result page
   else {
      // Show the final result section
      document.getElementById("final-result-section").style.display = "flex";
      // Update the result bar with the number of correct answers the user got
      document.getElementById("result-bar").style.width = correctAnswers + "0%";

      // If the user didn't get everything right
      if(correctAnswers != 10) {
         // Display the number of correct answers 
         document.getElementById("result-bar-label-inner").textContent = correctAnswers;
         // Adjust the body height
         document.body.style.height = "auto";

         // For each answer the user got incorrect create a review container
         var reviewSection = document.getElementById("review-section");
         incorrectAnswers.forEach(i => {
            // Create a review container using the appropriate question data
            var q = questions[i];
            var reviewContainer = createReview((i + 1), q.question, q.answers[q.correct]);
            // Add the review container to the document
            reviewSection.appendChild(reviewContainer);
         });
      } else { // If the user did get everything right
         // Hide the result bar and review section
         document.getElementById("incorrect-container").style.display = "none";
         // Change the text on the result bar label
         var label = document.getElementById("result-bar-label");
         label.textContent = "You got everything right!";
         // Increase the font size of the result bar label
         label.style.fontSize = "1.6em"
      }

      // Determine which header to use based on how many correct answers the user got
      var finalResultHeader = document.getElementById("final-result-header");
      if(correctAnswers <= 5) {
         finalResultHeader.textContent = "Better Luck Next Time";
      } else if(correctAnswers == 10) {
         finalResultHeader.textContent = "Amazing!";
      } else {
         finalResultHeader.textContent = "Good Job!";
      }
   }
}

// Reload the page to reset the quiz
function resetQuiz() {
   window.location.reload();
}

function createReview(questionNumber, questionText, answerText) {
   // Create Question Number P Element
   var reviewQuestionNumber = document.createElement("p");
   reviewQuestionNumber.textContent = "Q" + questionNumber;
   // Create Question P Element
   var reviewQuestion = document.createElement("p");
   reviewQuestion.textContent = questionText;
   reviewQuestion.setAttribute("class", "review-question");
   // Create Answer P Element
   var reviewAnswer = document.createElement("p");
   reviewAnswer.textContent = answerText;
   reviewAnswer.setAttribute("class", "review-answer");
   // Create review content div
   var reviewContent = document.createElement("div");
   reviewContent.setAttribute("class", "review-question-content grey-background");
   // Add p elements to review content div
   reviewContent.appendChild(reviewQuestion);
   reviewContent.appendChild(reviewAnswer);
   // Create Question number div
   var questionDiv = document.createElement("div");
   questionDiv.setAttribute("class", "review-question-number grey-background");
   // Add question number to div
   questionDiv.appendChild(reviewQuestionNumber);
   // Create review container
   var reviewContainer = document.createElement("div");
   reviewContainer.setAttribute("class", "review-container");
   // Add number and question to container
   reviewContainer.appendChild(questionDiv);
   reviewContainer.appendChild(reviewContent);

   // Return the review container
   return reviewContainer;
}