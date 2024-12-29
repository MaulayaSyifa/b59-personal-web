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

function showAll() {
	//add onclick on prefered button
}

const testimonialsContainer = document.getElementById("testimonialsContainer");
const testimonialsHTML = testimonials
	.map(
		(testimonial) => `
    // insert HTML here..
    // 
    // ${testimonial.author}
    // ${testimonial.stars}
    // ${testimonial.comment}
    // ${testimonial.image}
`
	)
	.join("");

testimonialsContainer.innerHTML = testimonials;

function filterByStars() {
	// onClick = (filteredByStars(5))
	const filteredByStarts = testimonials.filter((testimonial) => testimonial.stars === rating);

	if (filteredByStarts.length == 0) {
		return (testimonialsContainer.innerHTML = "<p>No testimonials</p>");
	}

	testimonialsContainer.innerHTML = testimonialsHTML(filteredByStarts);
}
