import gsap from "gsap";

const AnimationsTodoList = () => {

  useGSAP(() => {
    gsap.from(["#completed-task", "#uncompleted-task"], {
      x: 0,
      duration: 1,
      opacity: 0,
      ease: "power1.inOut",
      delay: 1.5,
    });
  });

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set("#todo-list > .listItem", { opacity: 0 });
    filtered.forEach((todo, index) => {
      tl.fromTo(`#todo-list >.listItem:nth-child(${index + 1})`, {
        y: -25,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
        delay: index * 0.2,
      });
    });
    tl.play();
  }, []);

};


export default AnimationsTodoList