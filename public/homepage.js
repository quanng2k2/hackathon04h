let form = document.getElementById("main-form");

form.onsubmit = async function (e) {
  e.preventDefault();
  let player1 = form.player1.value;
  let player2 = form.player2.value;
  let player3 = form.player3.value;
  let player4 = form.player4.value;

  try {
    let res = await fetch("http://localhost:3000/api/v1/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player1,
        player2,
        player3,
        player4,
      }),
    });
    let data = await res.json();
    window.location.href = `/game-detail/${data.id}`;
  } catch (error) {
    alert(error);
    console.log(error);
  }
};
