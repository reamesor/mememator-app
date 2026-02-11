/**
 * Canvas-drawn character and art for each meme template.
 * Draws recognizable figures/scenes so memes have character, not just text.
 */

export type MemeTemplateId =
  | "Drake pointing (approve / reject)"
  | "Distracted boyfriend"
  | "Two buttons / This is fine"
  | "Change my mind"
  | "Expanding brain"
  | "Bernie Sanders mittens"
  | "Woman yelling at cat"
  | "Success kid"
  | "One does not simply"
  | "This is fine"
  | "Left/Right panel";

export function drawMemeTemplateArt(
  ctx: CanvasRenderingContext2D,
  templateId: MemeTemplateId,
  w: number,
  h: number
): void {
  const halfH = h / 2;
  const cx = w / 2;
  const cy = h / 2;

  switch (templateId) {
    case "Drake pointing (approve / reject)":
      drawDrake(ctx, w, h, halfH);
      break;
    case "Distracted boyfriend":
      drawDistractedBoyfriend(ctx, w, h, halfH);
      break;
    case "Two buttons / This is fine":
      drawTwoButtons(ctx, w, h, halfH);
      break;
    case "Change my mind":
      drawChangeMyMind(ctx, w, h);
      break;
    case "Expanding brain":
      drawExpandingBrain(ctx, w, h);
      break;
    case "Bernie Sanders mittens":
      drawBernieMittens(ctx, w, h);
      break;
    case "Woman yelling at cat":
      drawWomanYellingAtCat(ctx, w, h, halfH);
      break;
    case "Success kid":
    case "One does not simply":
    case "This is fine":
    case "Left/Right panel":
      drawGenericTwoPanel(ctx, w, halfH);
      break;
    default:
      drawGenericTwoPanel(ctx, w, halfH);
  }
}

/** Drake format: top = reject (figure waving off), bottom = approve (figure pointing) */
function drawDrake(ctx: CanvasRenderingContext2D, w: number, h: number, halfH: number) {
  const cx = w / 2;
  const topCy = halfH / 2;
  const bottomCy = halfH + halfH / 2;

  // Top panel — purple/gray, figure rejecting (arm blocking)
  ctx.fillStyle = "#2d1b4e";
  ctx.fillRect(0, 0, w, halfH);
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, w, halfH - 2);
  drawSilhouette(ctx, cx, topCy, 0.9 * Math.min(w, halfH) * 0.45, "reject");

  // Bottom panel — warmer, figure approving (pointing)
  ctx.fillStyle = "#3d2a5c";
  ctx.fillRect(0, halfH, w, halfH);
  ctx.fillStyle = "#2d2040";
  ctx.fillRect(0, halfH + 2, w, halfH - 2);
  drawSilhouette(ctx, cx, bottomCy, 0.9 * Math.min(w, halfH) * 0.45, "approve");
}

function drawSilhouette(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  pose: "reject" | "approve"
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale / 80, scale / 80);
  ctx.fillStyle = "#4a3a5a";
  ctx.strokeStyle = "#2d2438";
  ctx.lineWidth = 3;

  // Head
  ctx.beginPath();
  ctx.ellipse(0, -42, 22, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Body (hoodie-ish shape)
  ctx.beginPath();
  ctx.moveTo(-28, -8);
  ctx.lineTo(-32, 38);
  ctx.lineTo(32, 38);
  ctx.lineTo(28, -8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (pose === "reject") {
    // Arm waving off / blocking
    ctx.beginPath();
    ctx.ellipse(-38, -5, 18, 10, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-50, 5);
    ctx.lineTo(-70, -15);
    ctx.lineWidth = 12;
    ctx.stroke();
  } else {
    // Arm pointing up (approve)
    ctx.beginPath();
    ctx.moveTo(35, -15);
    ctx.lineTo(65, -55);
    ctx.lineWidth = 14;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(68, -58, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

/** Distracted boyfriend: girlfriend left (angry), boyfriend center (looking right), other woman right */
function drawDistractedBoyfriend(ctx: CanvasRenderingContext2D, w: number, h: number, halfH: number) {
  const cx = w / 2;
  const pad = 24;
  const topCy = halfH / 2;
  const bottomCy = halfH + halfH / 2;

  // Top panel — scene: girlfriend + boyfriend
  ctx.fillStyle = "#1e2a38";
  ctx.fillRect(0, 0, w, halfH);
  ctx.fillStyle = "#15202b";
  ctx.fillRect(0, 0, w, halfH - 2);
  const s = Math.min(w, halfH) * 0.12;
  drawStickFigure(ctx, pad + s * 2, topCy, s, "woman", "angry", "left");
  drawStickFigure(ctx, cx - s, topCy, s, "man", "looking", "right");
  drawStickFigure(ctx, w - pad - s * 2, topCy, s, "woman", "happy", "left");

  // Bottom panel — same composition, different angle or emphasis
  ctx.fillStyle = "#1a2835";
  ctx.fillRect(0, halfH, w, halfH);
  ctx.fillStyle = "#0f1923";
  ctx.fillRect(0, halfH + 2, w, halfH - 2);
  drawStickFigure(ctx, pad + s * 2, bottomCy, s, "woman", "angry", "left");
  drawStickFigure(ctx, cx - s, bottomCy, s, "man", "looking", "right");
  drawStickFigure(ctx, w - pad - s * 2, bottomCy, s, "woman", "happy", "left");
}

function drawStickFigure(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  type: "man" | "woman",
  mood: "angry" | "happy" | "looking",
  faceDir: "left" | "right"
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = type === "man" ? "#6b7b8c" : "#8b7a9c";
  ctx.fillStyle = type === "man" ? "#5a6a7a" : "#7a6a8a";
  ctx.lineWidth = Math.max(2, scale / 8);
  ctx.lineCap = "round";

  // Head
  ctx.beginPath();
  ctx.arc(0, -scale * 2.2, scale * 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Face
  if (mood === "angry") {
    ctx.beginPath();
    ctx.moveTo(-scale * 0.4, -scale * 2.1);
    ctx.lineTo(scale * 0.4, -scale * 2.3);
    ctx.moveTo(scale * 0.3, -scale * 2.2);
    ctx.lineTo(-scale * 0.3, -scale * 2.4);
    ctx.stroke();
  } else if (mood === "happy") {
    ctx.beginPath();
    ctx.arc(0, -scale * 2, scale * 0.3, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();
  }
  if (mood === "looking") {
    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.arc(faceDir === "right" ? scale * 0.3 : -scale * 0.3, -scale * 2.2, scale * 0.15, 0, Math.PI * 2);
    ctx.fill();
  }

  // Body
  ctx.beginPath();
  ctx.moveTo(0, -scale * 1.2);
  ctx.lineTo(0, scale * 0.8);
  ctx.stroke();
  // Arms
  ctx.beginPath();
  ctx.moveTo(0, -scale * 0.5);
  ctx.lineTo(faceDir === "right" ? scale * 1.2 : -scale * 1.2, scale * 0.2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -scale * 0.3);
  ctx.lineTo(faceDir === "left" ? scale * 1 : -scale * 1, -scale * 0.8);
  ctx.stroke();
  // Legs
  ctx.beginPath();
  ctx.moveTo(0, scale * 0.8);
  ctx.lineTo(-scale * 0.6, scale * 2.2);
  ctx.moveTo(0, scale * 0.8);
  ctx.lineTo(scale * 0.6, scale * 2.2);
  ctx.stroke();

  ctx.restore();
}

/** Two buttons: two big buttons; top = one option, bottom = other */
function drawTwoButtons(ctx: CanvasRenderingContext2D, w: number, h: number, halfH: number) {
  const cx = w / 2;
  const buttonW = w * 0.36;
  const buttonH = 56;
  const topCy = halfH / 2 - 20;
  const bottomCy = halfH + halfH / 2 - 20;

  // Top panel
  ctx.fillStyle = "#1a2332";
  ctx.fillRect(0, 0, w, halfH);
  roundRect(ctx, cx - buttonW / 2 - 8, topCy - buttonH / 2, buttonW, buttonH, 12);
  ctx.fillStyle = "#3b82f6";
  ctx.fill();
  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 2;
  ctx.stroke();
  roundRect(ctx, cx + 8, topCy - buttonH / 2, buttonW, buttonH, 12);
  ctx.fillStyle = "#64748b";
  ctx.fill();
  ctx.strokeStyle = "#475569";
  ctx.stroke();

  // Bottom panel
  ctx.fillStyle = "#16202a";
  ctx.fillRect(0, halfH, w, halfH);
  roundRect(ctx, cx - buttonW / 2 - 8, bottomCy - buttonH / 2, buttonW, buttonH, 12);
  ctx.fillStyle = "#22c55e";
  ctx.fill();
  ctx.strokeStyle = "#16a34a";
  ctx.stroke();
  roundRect(ctx, cx + 8, bottomCy - buttonH / 2, buttonW, buttonH, 12);
  ctx.fillStyle = "#64748b";
  ctx.fill();
  ctx.strokeStyle = "#475569";
  ctx.stroke();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** Change my mind: desk, figure sitting with sign */
function drawChangeMyMind(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  ctx.fillStyle = "#2c3e50";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#34495e";
  ctx.fillRect(0, 0, w, h - 4);
  // Desk
  ctx.fillStyle = "#4a3728";
  ctx.fillRect(w * 0.15, h * 0.55, w * 0.7, h * 0.12);
  ctx.strokeStyle = "#3d2e22";
  ctx.lineWidth = 2;
  ctx.strokeRect(w * 0.15, h * 0.55, w * 0.7, h * 0.12);
  // Figure (simplified sitting)
  ctx.fillStyle = "#5d6d7e";
  ctx.beginPath();
  ctx.ellipse(cx, h * 0.48, 28, 32, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#4a5a6a";
  ctx.stroke();
  ctx.fillRect(cx - 25, h * 0.5, 50, 55);
  ctx.strokeRect(cx - 25, h * 0.5, 50, 55);
  // Sign "Change my mind"
  ctx.fillStyle = "#ecf0f1";
  ctx.fillRect(cx - 70, h * 0.32, 140, 44);
  ctx.strokeStyle = "#bdc3c7";
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - 70, h * 0.32, 140, 44);
  ctx.fillStyle = "#2c3e50";
  ctx.font = "bold 14px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Change my mind", cx, h * 0.32 + 22);
}

/** Expanding brain: 4 stacked panels, brain gets bigger / more detailed */
function drawExpandingBrain(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const panelH = h / 4;
  const colors = ["#1a1a2e", "#16213e", "#1a2a4a", "#1e3a5a"];
  for (let i = 0; i < 4; i++) {
    const y = i * panelH;
    ctx.fillStyle = colors[i];
    ctx.fillRect(0, y, w, panelH);
    ctx.strokeStyle = "#2a2a4a";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, y, w, panelH);
    const brainCy = y + panelH / 2;
    const brainSize = 18 + i * 22;
    drawBrain(ctx, cx, brainCy, brainSize, i);
  }
}

function drawBrain(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, level: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = level < 2 ? "#4a4a6a" : "#6a7a9a";
  ctx.fillStyle = level < 2 ? "#2a2a4a" : "rgba(80,90,120,0.6)";
  ctx.lineWidth = Math.max(1, level);
  // Main brain blob
  ctx.beginPath();
  ctx.ellipse(0, 0, radius, radius * 0.85, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Left/right lobes
  ctx.beginPath();
  ctx.ellipse(-radius * 0.4, 0, radius * 0.45, radius * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(radius * 0.4, 0, radius * 0.45, radius * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  if (level >= 2) {
    ctx.beginPath();
    ctx.ellipse(0, -radius * 0.3, radius * 0.35, radius * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

/** Bernie mittens: figure in coat with mittens */
function drawBernieMittens(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  ctx.fillStyle = "#2d3436";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#636e72";
  ctx.fillRect(0, 0, w, h - 4);
  // Chair/bench
  ctx.fillStyle = "#4a5568";
  ctx.fillRect(w * 0.2, h * 0.62, w * 0.6, h * 0.08);
  // Coat body
  ctx.fillStyle = "#2c5282";
  ctx.fillRect(cx - 55, h * 0.28, 110, 180);
  ctx.strokeStyle = "#1e3a5f";
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - 55, h * 0.28, 110, 180);
  // Collar
  ctx.fillStyle = "#1e3a5f";
  ctx.beginPath();
  ctx.moveTo(cx - 30, h * 0.28);
  ctx.lineTo(cx, h * 0.38);
  ctx.lineTo(cx + 30, h * 0.28);
  ctx.fill();
  ctx.stroke();
  // Head
  ctx.fillStyle = "#d4a574";
  ctx.beginPath();
  ctx.ellipse(cx, h * 0.22, 38, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#b8956a";
  ctx.stroke();
  // Mittens (crossed on lap)
  ctx.fillStyle = "#c0392b";
  ctx.beginPath();
  ctx.ellipse(cx - 35, h * 0.5, 28, 22, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#922b21";
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx + 35, h * 0.52, 28, 22, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Glasses
  ctx.strokeStyle = "#2c3e50";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(cx - 12, h * 0.2, 14, 14, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx + 12, h * 0.2, 14, 14, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 2, h * 0.2);
  ctx.lineTo(cx + 2, h * 0.2);
  ctx.stroke();
}

function drawGenericTwoPanel(ctx: CanvasRenderingContext2D, w: number, halfH: number) {
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, w, halfH);
  ctx.fillStyle = "#16213e";
  ctx.fillRect(0, halfH, w, halfH);
}

/** Woman yelling at cat: left = woman yelling, right = cat at table */
function drawWomanYellingAtCat(ctx: CanvasRenderingContext2D, w: number, h: number, halfH: number) {
  const leftW = w / 2;
  const rightW = w - leftW;
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, leftW, halfH);
  ctx.fillStyle = "#2e1a4a";
  ctx.fillRect(0, halfH, leftW, halfH);
  ctx.fillStyle = "#1e3a4a";
  ctx.fillRect(leftW, 0, rightW, halfH);
  ctx.fillStyle = "#1a3a3a";
  ctx.fillRect(leftW, halfH, rightW, halfH);
  const scale = Math.min(leftW, halfH) * 0.12;
  drawStickFigure(ctx, leftW / 3, halfH / 2, scale, "woman", "angry", "right");
  const catX = leftW + rightW / 2;
  const catY = halfH / 2;
  const r = 24;
  ctx.fillStyle = "#f59e0b";
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(catX, catY - 4, r * 0.9, r, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(catX - r * 0.6, catY - r - 4);
  ctx.lineTo(catX - r * 0.2, catY - r * 0.5 - 4);
  ctx.moveTo(catX + r * 0.6, catY - r - 4);
  ctx.lineTo(catX + r * 0.2, catY - r * 0.5 - 4);
  ctx.stroke();
}
