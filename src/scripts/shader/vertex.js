varying vec2 vUv;

void main(void)
{
    vUv = uv;
    vec3 pos = position;
    pos.xy = 2.0 * sin(pos.xy) - 1.0;
    pos.x -= 0.009;
    gl_Position = projectionMatrix * viewMatrix * vec4( pos, 1.0 ) * vec4(4.9, 4.9, 1.0, 1.0) + vec4(4.6, 9.2, 1.0, 1.0);
}