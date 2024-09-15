function gameApp() {
    return {
        questions: [], // Store the fetched questions
        currentQuestionIndex: 0,
        selectedAnswer: null,
        submitted: false,
        score: 0,
        isGameOver: false,
        isCorrect: false, // Define the variable

        // Fetch questions when the game starts
        async init() {
            try {
                const response = await fetch('/api/questions?limit=10');
                this.questions = await response.json();
                this.currentQuestion = this.questions[this.currentQuestionIndex];
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        },

        // Get the current question
        get currentQuestion() {
            return this.questions[this.currentQuestionIndex] || {};
        },

        // Select an answer
        selectAnswer(choice) {
            this.selectedAnswer = choice;
        },

        // Submit the answer and show feedback
        submitAnswer() {
            if (!this.selectedAnswer) return;
            this.submitted = true;

            // Check if the selected answer is correct
            this.isCorrect = this.selectedAnswer === this.currentQuestion.correct_answer;

            // Increase the score if correct
            if (this.isCorrect) {
                this.score += this.currentQuestion.score;
            }
        },

        // Move to the next question or end the game
        nextQuestion() {
            this.submitted = false;
            this.selectedAnswer = null;
            this.currentQuestionIndex++;

            // Check if the game is over
            if (this.currentQuestionIndex >= this.questions.length) {
                this.isGameOver = true;
            }
        },

        // Redirect to the congrats page with the score
        goToCongrats() {
            const url = `/congrats?score=${this.score}&total=100`;
            window.location.href = url;
        }
    };
}
