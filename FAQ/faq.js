document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", function() {
            const currentItem = this.parentElement;
            const currentAnswer = this.nextElementSibling;


            const isActive = currentItem.classList.contains("active");

            // Close all other FAQ items
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".faq-answer").style.maxHeight = null;
            });


            if (!isActive) {
                currentItem.classList.add("active");
                // scrollHeight yields the exact height of the content inside
                currentAnswer.style.maxHeight = currentAnswer.scrollHeight + "px";
            }
        });
    });
});