uniform sampler2D texture1;
uniform vec2 OpticalCenter;
uniform vec2 FCoff;
uniform vec4 KCoff;

varying vec2 vUv;

void main() {
    vec2 xy = (vUv - OpticalCenter) / FCoff;

    float r=sqrt(dot(xy,xy));
    float r2=r*r;
    float r4=r2*r2;
    float coeff=(KCoff.x*r2+KCoff.y*r4); //radial factor

    float dx=KCoff.z*2.0*xy.x*xy.y    + KCoff.w*(r2+2.0*xy.x*xy.x);
    float dy=KCoff.z*(r2+2.0*xy.y*xy.y) + KCoff.w*2.0*xy.x*xy.y;

    vec2 pos = (xy + xy*coeff + vec2(dx,dy)) * FCoff + OpticalCenter;

    gl_FragColor = texture2D(texture1, pos);
}
