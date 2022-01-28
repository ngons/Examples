var callback;

svg.size(1, 1)
  .padding(0.02)
  .strokeWidth(0.01);

const bottomLayer = svg.g();
const topLayer = svg.g();
let last_face;
let crane;

const drawTree = (graph, face) => {
  topLayer.removeChildren();
  const center = ear.math.centroid(graph.faces_vertices[face]
    .map(v => graph.vertices_coords[v]));
  const tree = ear.graph.make_face_spanning_tree(graph, face);
  tree.forEach(row => row.forEach(el => {
    if (el.parent == null) { return; }
    topLayer.line(graph.faces_center[el.face], graph.faces_center[el.parent])
      .strokeDasharray("0.00001 0.015")
      .strokeLinecap("round")
      .stroke("#e53");
  }));
  topLayer.circle(center).radius(0.02).fill("#e53").stroke("none");
};

svg.onMove = (event) => {
  const face = ear.graph.nearest_face(crane, [event.x, event.y]);
  if (face === undefined) { return; }
  if (face !== last_face) {
    drawTree(crane, face);
  }
  last_face = face;
  if (callback) { callback({ face }); }
};

const load = (graph) => {
  crane = graph;

  crane.faces_center = ear.graph.make_faces_center(crane);
  ear.graph.make_face_spanning_tree(crane, 0);

  bottomLayer.removeChildren();
  const drawing = bottomLayer.origami(crane);
  drawing.edges.mountain.stroke("#158");
  drawing.edges.valley.stroke("black");

  drawTree(crane, 0);
};

load({"vertices_coords": [[0.5,0.7928932188134525],[0.5761204674887133,0.7167727513247393],[0.6755766511785422,0.8656194489676547],[1,1],[0.8086582838174552,0.46193976625564337],[0.7928932188134525,0.5],[0.5,0.20710678118654752],[0.5380602337443569,0.1913417161825448],[0.4746265108370956,0.9055909171082464],[0.5,1],[0.46193976625564337,0.8086582838174552],[0.40236892706218264,0.7311456783745411],[0.35355339059327373,0.6464466094067262],[0.2071067811865476,0.5],[0.2832272486752608,0.4238795325112868],[0.5,0.5],[0.09440908289175362,0.5253734891629045],[0.19134171618254492,0.5380602337443567],[0.5976310729378173,0.26885432162545897],[0.6464466094067263,0.35355339059327373],[0.9055909171082465,0.47462651083709556],[1,0.5],[0.731145678374541,0.40236892706218275],[0.4365087311134498,0.18080783652146148],[0,1],[0.33408931895964944,0.5],[0.5,0.6659106810403506],[0.42387953251128685,0.2832272486752607],[0.5,0.33408931895964944],[0.6659106810403506,0.5],[0.7167727513247393,0.5761204674887133],[0.8656194489676547,0.6755766511785422],[0.9701901878404703,0.1498640459224571],[1,0.17557665117854204],[1,0],[0.915108837196079,0.12704860345172225],[0.9328097244838275,0.1622116744107287],[0.8758485593336279,0.1241514406663721],[0.8377883255892713,0.06719027551617254],[0.8729513965482778,0.08489116280392092],[0.824423348821458,0],[0.8501359540775429,0.029809812159529714],[0.26885432162545886,0.5976310729378174],[0.5253734891629046,0.09440908289175354],[0,0],[0,0.41020978644836315],[0,0.5],[0.37301746222689847,0.20710678118654807],[0.18080783652146154,0.4365087311134497],[0.32442334882145774,0.13438055103234525],[0.41020978644836337,0.11731656763491008],[0.13438055103234534,0.3244233488214578],[0.1173165676349102,0.41020978644836315],[0.41020978644836315,0],[0.5,0],[0.20710678118654802,0.3730174622268984]],"edges_vertices": [[0,1],[2,3],[4,5],[6,7],[8,9],[10,8],[11,10],[12,11],[13,14],[12,15],[16,17],[9,3],[10,0],[13,17],[18,19],[7,18],[20,21],[4,20],[19,22],[23,6],[16,24],[17,24],[25,15],[15,26],[26,1],[26,0],[0,2],[1,2],[27,28],[6,28],[29,5],[29,30],[15,29],[5,31],[28,18],[20,31],[11,26],[8,2],[32,33],[34,33],[35,36],[19,37],[7,38],[38,39],[18,39],[39,37],[37,35],[35,22],[36,32],[40,34],[41,38],[40,41],[34,32],[41,34],[38,34],[39,34],[37,34],[34,35],[34,36],[21,3],[31,3],[30,31],[30,5],[27,6],[14,25],[25,42],[42,12],[43,41],[43,7],[44,45],[45,46],[47,23],[48,13],[49,50],[50,43],[51,52],[52,16],[44,53],[53,54],[13,25],[17,42],[42,24],[24,12],[24,11],[24,10],[24,8],[24,9],[50,23],[52,48],[54,40],[54,43],[49,23],[49,47],[51,55],[46,24],[46,16],[47,27],[45,52],[33,21],[32,20],[36,4],[22,4],[22,29],[15,19],[28,15],[55,14],[55,48],[51,48],[53,50],[44,49],[44,51],[55,47],[14,27],[1,30]],"edges_assignment": ["V","M","M","M","M","V","M","V","V","V","V","B","M","M","V","M","M","V","V","M","V","M","M","M","V","M","M","M","V","M","M","V","M","M","M","V","M","V","V","B","V","M","M","V","M","M","M","M","M","B","M","V","V","V","M","M","V","M","M","B","M","M","V","V","V","M","V","V","V","B","B","V","M","V","V","V","V","B","B","M","M","M","M","M","M","V","B","M","M","B","M","M","M","M","B","M","M","V","B","V","M","M","M","V","M","M","V","M","V","M","M","M","V","V"],"faces_vertices": [[26,0,10,11],[1,0,26],[2,0,1],[10,0,2,8],[30,1,26,15,29],[2,1,30,31,3],[8,2,3,9],[21,3,31,20],[22,4,5,29],[36,4,22,35],[20,4,36,32],[5,4,20,31],[30,5,31],[29,5,30],[23,6,27,47],[7,6,23,50,43],[28,6,7,18],[27,6,28],[38,7,43,41],[18,7,38,39],[10,8,24],[24,8,9],[11,10,24],[12,11,24],[26,11,12,15],[42,12,24],[15,12,42,25],[48,13,17,16,52],[14,13,48,55],[25,13,14],[17,13,25,42],[27,14,55,47],[25,14,27,28,15],[19,15,28,18],[29,15,19,22],[46,16,24],[52,16,46,45],[24,16,17],[24,17,42],[19,18,39,37],[22,19,37,35],[21,20,32,33],[49,23,47],[50,23,49],[34,32,36],[33,32,34],[35,34,36],[37,34,35],[39,34,37],[38,34,39],[41,34,38],[40,34,41],[54,40,41,43],[54,43,50,53],[49,44,53,50],[51,44,49,47,55],[45,44,51,52],[51,48,52],[55,48,51]]});
