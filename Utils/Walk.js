import Point from "./Point";

const looking = [];
const looked = [];
let end = null;

const isChecked = (point) => {
  let is = false
  looked.forEach((el) => {
    if (point.compare(el)) {
      is = true;
    }
  })
  return is
}

const isLooking = (point) => {
  let is = false
  looking.forEach((el) => {
    if (point.compare(el)) {
      is = true;
    }
  })
  return is
}

const looks = (maze, point, border) => {
  if (maze[point.y][point.x] !== 1 && !isChecked(point)) {
    if (point.x === border || point.y === border) {
      return point;
    }
    looking.push(point);
  }
  return false;
}

const looksLeft = (maze, prevPoint) => {
  const point = new Point(prevPoint.x - 1, prevPoint.y, prevPoint);
  return looks(maze, point, 0);
}

const looksRight = (maze, prevPoint) => {
  const mazeWidth = maze[0].length - 1;
  const point = new Point(prevPoint.x + 1, prevPoint.y, prevPoint);
  return looks(maze, point, mazeWidth);
}

const looksTop = (maze, prevPoint) => {
  const point = new Point(prevPoint.x, prevPoint.y - 1, prevPoint);
  return looks(maze, point, 0);
}

const looksBottom = (maze, prevPoint) => {
  const mazeHeight = maze.length - 1;
  const point = new Point(prevPoint.x, prevPoint.y + 1, prevPoint);
  return looks(maze, point, mazeHeight);
}

const looksAround = (maze, point) => {
  const searchResult = looksLeft(maze, point)
    || looksRight(maze, point)
    || looksTop(maze, point)
    || looksBottom(maze, point);

  looked.push(point);
  return searchResult;
}

const printWay = (point) => {
  if (point.prev) {
    return `${printWay(point.prev)} -> x-${point.x},y-${point.y}`
  } else {
    return `x-${point.x},y-${point.y}`
  }
}

export const walk = (maze, point) => {
  looking.push(point);

  while (looking.length && !end) {
    end = looksAround(maze, looking.shift());
  }

  console.log(printWay(end));
}