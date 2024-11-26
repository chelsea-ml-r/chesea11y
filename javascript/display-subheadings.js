document.addEventListener("DOMContentLoaded", function () {
    // Select all links in the Table of Contents
    const tocLinks = document.querySelectorAll(".table-of-contents a");

    tocLinks.forEach(link => {
        // Get the ID of the target heading from the href attribute
        const targetHeadingId = link.getAttribute("href").substring(1);
        const targetHeading = document.getElementById(targetHeadingId);

        if (targetHeading && targetHeading.tagName.toLowerCase() === "h2") {
            // Find the parent 'note' div of the target heading
            const noteDiv = targetHeading.closest(".note");

            if (noteDiv) {
                // Retrieve all heading elements within the note, excluding the h2
                const otherHeadings = noteDiv.querySelectorAll("h3, h4, h5, h6");

                if (otherHeadings.length > 0) {
                    // Create a new nested <ul> element
                    const nestedList = document.createElement("ul");

                    otherHeadings.forEach(heading => {
                        // Create a <li> for each heading
                        const listItem = document.createElement("li");
                        listItem.textContent = heading.textContent.trim(); // Add heading text
                        nestedList.appendChild(listItem);
                    });

                    // Append the nested <ul> after the link
                    const parentLi = link.parentElement;
                    parentLi.appendChild(nestedList);
                }
            } else {
                console.warn(`No parent 'note' div found for heading: ${targetHeadingId}`);
            }
        } else {
            console.warn(`No valid h2 found for link: ${link}`);
        }
    });
});
