let testimonials = [
	{
		author: "test a",
		stars: 1,
		comment: "comment a",
		image: "test1.jpg",
	},
	{
		author: "test b",
		stars: 4,
		comment: "comment b",
		image: "test2.jpg",
	},
	{
		author: "test c",
		stars: 3,
		comment: "comment c",
		image: "test3.jpg",
	},
	{
		author: "test d",
		stars: 2,
		comment: "comment d",
		image: "test4.jpg",
	},
	{
		author: "test 3",
		stars: 5,
		comment: "comment 3",
		image: "test5.jpg",
	},
];

const testimonialsContainer = document.getElementById("testimonial-container");

const testimonialsHTML = (daftarTestimoni) => {
	return daftarTestimoni
		.map(
			(testimonial) => `
    <div class="d-flex justify-content-center my-3">
        <div class="card p-3 col mx-0">
            <img src="assets/img/${testimonial.image}" class="card-img-top" alt="..." />
            <div class="card-body px-0">
              <div class="overflow-scroll" style="height: 50px">
                <p class="card-text">${testimonial.content}</p>
              </div>
              <div class="text-end fw-bold mt-3">
                <p>- ${testimonial.author}</p>
                <p>${testimonial.rating}✯</p>
              </div>
            </div>
        </div>
    </div>`
		)
		.join("");
};

function showAllTestimonials() {
	testimonialsContainer.innerHTML = testimonialsHTML(testimonials);
}

showAllTestimonials();

function filterTestimonialByStar(rating) {
	const filteredTestimonial = testimonials.filter((testimonial) => testimonial.rating === rating);

	console.log(filteredTestimonial);

	if (filteredTestimonial.length === 0) {
		return (testimonialsContainer.innerHTML = `<p>No testimonials.</p>`);
	}

	setTimeout(() => {
		testimonialsContainer.innerHTML = testimonialsHTML(filteredTestimonial);
	}, 1000);
}
