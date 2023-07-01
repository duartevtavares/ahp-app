import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ahpApp';

  ngOnInit() {
    //   let points = [
    //     [1, 4, 7],
    //     [3, 6, 1],
    //     [1, 4, 8],
    //     [9, 5, 3],
    //     [2, 5, 6],
    //   ];
    //   for (let i = 0; i < points.length; i++) {
    //     let x = points[i][0];
    //     let y = points[i][1];
    //     let z = points[i][2];
    //     console.log(y);
    //     // console.log(y);
    //     // console.log(z);
    //     // let lambda1 =
    //     //   ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) /
    //     //   ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
    //     // let lambda2 =
    //     //   ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) /
    //     //   ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
    //     // let lambda3 = 1 - lambda1 - lambda2;
    //   }
    // }

    interface Point {
      x: number;
      y: number;
    }

    let points: Point[] = [
      { x: 30, y: 2 },
      { x: 67, y: 0.5 },
      { x: 80, y: 1.86 },
    ];
    let external_point: Point = { x: 68, y: 1.8 };

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        for (let k = j + 1; k < points.length; k++) {
          let A = points[i];
          let B = points[j];
          let C = points[k];

          let inTriangle = isPointInTriangle2D(external_point, A, B, C);
          if (inTriangle) {
            console.log(
              `Point (${external_point.x}, ${external_point.y}) is inside triangle (${A.x}, ${A.y}), (${B.x}, ${B.y}), (${C.x}, ${C.y})`
            );
          }
        }
      }
    }

    function isPointInTriangle2D(
      point: Point,
      A: Point,
      B: Point,
      C: Point
    ): boolean {
      let lambda1 =
        ((B.y - C.y) * (point.x - C.x) + (C.x - B.x) * (point.y - C.y)) /
        ((B.y - C.y) * (A.x - C.x) + (C.x - B.x) * (A.y - C.y));
      let lambda2 =
        ((C.y - A.y) * (point.x - C.x) + (A.x - C.x) * (point.y - C.y)) /
        ((B.y - C.y) * (A.x - C.x) + (C.x - B.x) * (A.y - C.y));
      let lambda3 = 1 - lambda1 - lambda2;
      return (
        lambda1 >= 0 &&
        lambda1 <= 1 &&
        lambda2 >= 0 &&
        lambda2 <= 1 &&
        lambda3 >= 0 &&
        lambda3 <= 1
      );
    }
  }
}
