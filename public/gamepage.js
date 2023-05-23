let playerContainer = document.getElementById("player-container");
let scoreSum = document.getElementById("sum-of-score");
let userTSContainer = document.querySelector(".table-primary");
let btnAdd = document.querySelector(".btn-add");
let tbody = document.getElementById("tbody");
let roundData = [];

let hrefArray = window.location.href.split("/");
let gameId = hrefArray[hrefArray.length - 1];

fetch(`http://localhost:3000/api/v1/games/${gameId}`)
  .then((res) => res.json())
  .then((data) => {
    let { users, rounds } = data;
    roundData = rounds;
    playerContainer.innerHTML = `
                <th scope="col">#</th>
                <th scope="col">${users[0]}</th>
                <th scope="col">${users[1]}</th>
                <th scope="col">${users[2]}</th>
                <th scope="col">${users[3]}</th>
    `;
    renderRound(rounds);
  })
  .catch((err) => {
    alert(err);
    console.log(err);
  });

// Chức năng thêm mới 1 round

btnAdd.onclick = function () {
  // Thêm mới 1 round ở trên CSDL (database)
  fetch("http://localhost:3000/api/v1/games/" + gameId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roundPoints: [0, 0, 0, 0],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      roundData.push([0, 0, 0, 0]);
      renderRound(roundData);
      // Thêm mới 1 round ở trên giao diện (UI)
    })
    .catch((err) => {
      alert(err);
      console.log(err);
    });
};

tbody.oninput = function (e) {
  let roundIndex = e.target.parentElement.parentElement.id;
  let columnIndex = e.target.parentElement.className.split("-")[1];
  let value = e.target.value;
  let round = roundData[roundIndex];
  round[columnIndex] = +value;
  roundData[roundIndex][columnIndex] = +value;
  fetch("http://localhost:3000/api/v1/games/" + gameId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roundIndex,
      roundPoints: round,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      renderRound(roundData);
    })
    .catch((err) => console.log(err));

  //   console.log(round);
  //   console.log("index của ô", columnIndex);
  //   console.log("index của dòng ", roundIndex);
  //   console.log("value", value);
};

// function RenderRound()
function renderRound(rounds) {
  tbody.innerHTML = ``;

  if (rounds.length === 0) {
    scoreSum.innerHTML = 0;
  } else {
    // Tính Total Score của tất cả các rounds
    let totalScore = rounds.reduce((pre, cur) => {
      let eachTotal = cur.reduce((pre2, cur2) => (pre2 += cur2));
      pre = pre + eachTotal;
      return pre;
    }, 0);
    scoreSum.innerHTML = totalScore;

    // Tính Total Score của từng player tại tất cả các rounds
    let totalPlayer1 = 0;
    let totalPlayer2 = 0;
    let totalPlayer3 = 0;
    let totalPlayer4 = 0;

    for (let i = 0; i < rounds.length; i = i + 1) {
      totalPlayer1 += rounds[i][0];
      totalPlayer2 += rounds[i][1];
      totalPlayer3 += rounds[i][2];
      totalPlayer4 += rounds[i][3];
    }

    userTSContainer.children[1].innerHTML = totalPlayer1;
    userTSContainer.children[2].innerHTML = totalPlayer2;
    userTSContainer.children[3].innerHTML = totalPlayer3;
    userTSContainer.children[4].innerHTML = totalPlayer4;
    rounds.forEach((e, i) => {
      tbody.innerHTML += `
                <tr id=${i}>
                    <th scope="row">${i + 1}</th>
                    <td class='${i}-0'>
                      <input class="form-control" type="number" value='${
                        e[0]
                      }' />
                    </td>
                    <td class='${i}-1'>
                      <input class="form-control" type="number" value='${
                        e[1]
                      }' />
                    </td>
                    <td class='${i}-2'>
                      <input class="form-control" type="number" value='${
                        e[2]
                      }' />
                    </td>
                    <td class='${i}-3'> 
                      <input class="form-control" type="number" value='${
                        e[3]
                      }' />
                    </td>
                  </tr>
            
            `;
    });
  }
}
