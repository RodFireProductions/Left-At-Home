/*~~ Declare assets to load behind loading screen ~~*/

// If you're using more sprite sheets or background images, add them here
imgNone = "./images/none.png";
imgCover = "./images/cover.png";
img1 = "./zine/pages/1.png";
img2 = "./zine/pages/2.png";
img3 = "./zine/pages/3.png";
img4 = "./zine/pages/4.png";
img5 = "./zine/pages/5.png";
img6 = "./zine/pages/FRONT.png";
img7 = "./zine/pages/BACK.png";
img8 = "./zine/pages/INNERFRONT.png";
imglace = "./images/lace.png";
imgBG = "./images/bedroom.png";
imgBG2 = "./images/background.png"

// sprites
s1 = "./images/bead_n_b.png";
s2 = "./images/bead_n.png";
s3 = "./images/bead_s_b.png";
s4 = "./images/bead_s.png";
s5 = "./images/freckles_n_b.png";
s6 = "./images/freckles_n.png";
s7 = "./images/freckles_s_b.png";
s8 = "./images/freckles_s.png";

const imageSrcs = [
  imgNone,
  imgCover,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  imglace,
  imgBG, imgBG2,
  s1, s2, s3, s4, s5, s6, s7, s8
];
imagesLoaded = false;

// sound assets
snd1 = "./sounds/typing.mp3";
const soundSrcs = [snd1];
soundsLoaded = false;

allAssetsLoaded = false;

/*~~ Preload assets ~~*/
$(window).load(function () {
  window.preloadedImages = [];
  imagesLoaded = 0;
  totalImages = imageSrcs.length;
  imageSrcs.forEach((imgUrl) => {
    var img = new Image();
    img.src = imgUrl;

    img.onload = (e) => {
      imagesLoaded++;
      window.preloadedImages.push(img);
      if (imagesLoaded === totalImages) {
        this.imagesLoaded = true;
        if (this.imagesLoaded && this.soundsLoaded) {
          donePreloading();
        }
      }
    };
  });

  soundsLoaded = 0;
  totalSounds = soundSrcs.length;
  soundSrcs.forEach((filename) => {
    var audio = new Audio(filename);

    audio.addEventListener("canplaythrough", () => {
      soundsLoaded++;
      if (soundsLoaded === totalSounds) {
        this.soundsLoaded = true;
        if (this.imagesLoaded && this.soundsLoaded) {
          donePreloading();
        }
      }
    });
  });
});
