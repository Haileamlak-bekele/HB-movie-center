const posters = document.querySelectorAll(".poster");
        const totalPosters = posters.length;
        let angle = 0;
        const step = 360 / totalPosters;
        const cylinder = document.getElementById("cylinder");

        function arrangePosters() {
            posters.forEach((poster, index) => {
                let rotation = index * step;
                let x = 250 * Math.cos(rotation * (Math.PI / 180));
                let z = 250 * Math.sin(rotation * (Math.PI / 180));
                poster.style.transform = `rotateY(${rotation}deg) translateZ(250px) scale(1)`;
            });
        }

        function rotateCylinder(direction) {
            angle += direction * step;
            cylinder.style.transform = `rotateY(${angle}deg)`;
            setTimeout(scaleFrontPoster, 500); // Delay scaling effect for smooth transition
        }

        function scaleFrontPoster() {
            let closestIndex = Math.round((-angle % 360) / step);
            if (closestIndex < 0) closestIndex += totalPosters;

            posters.forEach((poster, index) => {
                let rotation = index * step;
                let x = 250 * Math.cos(rotation * (Math.PI / 180));
                let z = 250 * Math.sin(rotation * (Math.PI / 180));

                if (index === closestIndex) {
                    poster.style.transform = `rotateY(${rotation}deg) translateZ(250px) scale(1.5)`;
                } else {
                    poster.style.transform = `rotateY(${rotation}deg) translateZ(250px) scale(1)`;
                }
            });
        }

        function autoRotate() {
            rotateCylinder(1);
        }

        arrangePosters();
        setTimeout(scaleFrontPoster, 500); // Initial front poster scaling
        let interval = setInterval(autoRotate, 4000);

        document.querySelector(".cylinder-container").addEventListener("mouseenter", () => {
            clearInterval(interval);
        });

        document.querySelector(".cylinder-container").addEventListener("mouseleave", () => {
            interval = setInterval(autoRotate, 4000);
        });


        document.getElementById("searchButton").addEventListener("click", function () {
            const query = document.getElementById("searchInput").value.trim();
            if (query) {
                window.location.href = `search-result.html?search=${encodeURIComponent(query)}`;
            }
        });

        document.getElementById("searchInput").addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                document.getElementById("searchButton").click();
            }
        }
        

        document.addEventListener("DOMContentLoaded", function() {
            const slider = document.querySelector(".slider");
            const prevBtn = document.getElementById("prevBtn");
            const nextBtn = document.getElementById("nextBtn");
          
            let scrollAmount = 0;
            const step = 200;
          
            prevBtn.addEventListener("click", function() {
              scrollAmount -= step;
              slider.scrollTo({
                left: scrollAmount,
                behavior: "smooth"
              });
            });
          
            nextBtn.addEventListener("click", function() {
              scrollAmount += step;
              slider.scrollTo({
                left: scrollAmount,
                behavior: "smooth"
              });
            });
          });
          