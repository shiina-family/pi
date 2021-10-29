export function $(func) {
  document.addEventListener('DOMContentLoaded', func)
}

export class Vec2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  *[Symbol.iterator]() {
    yield this.x
    yield this.y
  }

  add(v) {
    this.x += v.x
    this.y += v.y
    return this
  }

  clone() {
    return new Vec2(this.x, this.y)
  }

  static add(v1, v2) {
    return v1.clone().add(v2)
  }
}

export function getRandom(max) {
  return Math.random() * max
}

