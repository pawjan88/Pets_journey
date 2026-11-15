// Ground contact and walkable surfaces measured from the original atlases.
export const PROP_ROOTS={
  "tree": {
    "anchorX": 175.5,
    "anchorY": 432,
    "supportHalf": 69.5,
    "frame": 0
  },
  "palm": {
    "anchorX": 125.5,
    "anchorY": 432,
    "supportHalf": 65.5,
    "frame": 1
  },
  "mushroom": {
    "anchorX": 195.5,
    "anchorY": 431,
    "supportHalf": 88.5,
    "frame": 2
  },
  "snowman": {
    "anchorX": 186.0,
    "anchorY": 432,
    "supportHalf": 76.0,
    "frame": 3
  },
  "flowers": {
    "anchorX": 189.0,
    "anchorY": 432,
    "supportHalf": 60.0,
    "frame": 4
  },
  "shell": {
    "anchorX": 192.0,
    "anchorY": 432,
    "supportHalf": 50.0,
    "frame": 5
  },
  "hedgehog": {
    "anchorX": 172.0,
    "anchorY": 432,
    "supportHalf": 66.0,
    "frame": 6
  },
  "penguin": {
    "anchorX": 159.0,
    "anchorY": 432,
    "supportHalf": 41.0,
    "frame": 7
  }
};
export const POLISH_PROPS={
  "crab": {
    "name": "crab",
    "x": 0,
    "y": 0,
    "width": 512,
    "height": 512,
    "anchor": [
      256,
      496
    ],
    "contentBounds": [
      16,
      130,
      496,
      499
    ],
    "sourceBounds": [
      54,
      120,
      592,
      534
    ],
    "sourceAnchor": [
      323.0,
      530
    ],
    "scale": 0.8921933085501859
  },
  "trampoline": {
    "name": "trampoline",
    "x": 512,
    "y": 0,
    "width": 512,
    "height": 512,
    "anchor": [
      256,
      496
    ],
    "contentBounds": [
      16,
      248,
      496,
      499
    ],
    "sourceBounds": [
      16,
      229,
      598,
      533
    ],
    "sourceAnchor": [
      307.0,
      530
    ],
    "scale": 0.8247422680412371,
    "surfaceY": 307,
    "surfaceLeft": 56,
    "surfaceRight": 461,
    "surfaceYApproximation": true,
    "surfaceNote": "Horizontal collision line through the centre of the teal bounce mat; source local y=300. Rear rim is visibly above this line because of mild 3/4 perspective."
  },
  "flag_idle": {
    "name": "flag_idle",
    "x": 0,
    "y": 512,
    "width": 512,
    "height": 512,
    "anchor": [
      256,
      496
    ],
    "contentBounds": [
      173,
      107,
      488,
      498
    ],
    "sourceBounds": [
      106,
      34,
      550,
      585
    ],
    "sourceAnchor": [
      223.5,
      582
    ],
    "scale": 0.7100591715976331
  },
  "flag_active": {
    "name": "flag_active",
    "x": 512,
    "y": 512,
    "width": 512,
    "height": 512,
    "anchor": [
      256,
      496
    ],
    "contentBounds": [
      172,
      107,
      496,
      499
    ],
    "sourceBounds": [
      86,
      34,
      542,
      586
    ],
    "sourceAnchor": [
      204.0,
      582
    ],
    "scale": 0.7100591715976331
  }
};
export const POLISH_PLATFORMS={
  "beach_platform": {
    "name": "beach_platform",
    "x": 0,
    "y": 0,
    "width": 512,
    "height": 256,
    "anchor": [
      256,
      240
    ],
    "surfaceY": 146,
    "surfaceLeft": 30,
    "surfaceRight": 482,
    "surfaceYApproximation": true,
    "surfaceNote": "Collision line along the upper walkable deck, just below the uppermost silhouette antialiasing.",
    "contentBounds": [
      16,
      140,
      496,
      242
    ],
    "sourceBounds": [
      31,
      380,
      851,
      554
    ],
    "sourceAnchor": [
      441.0,
      550
    ],
    "scale": 0.5853658536585366
  },
  "raft": {
    "name": "raft",
    "x": 512,
    "y": 0,
    "width": 512,
    "height": 256,
    "anchor": [
      256,
      240
    ],
    "surfaceY": 109,
    "surfaceLeft": 30,
    "surfaceRight": 482,
    "surfaceYApproximation": true,
    "surfaceNote": "Collision line along the upper walkable deck, just below the uppermost silhouette antialiasing.",
    "contentBounds": [
      16,
      102,
      496,
      242
    ],
    "sourceBounds": [
      47,
      371,
      844,
      604
    ],
    "sourceAnchor": [
      445.5,
      600
    ],
    "scale": 0.6022584692597239
  }
};
