import example from "../assets/example.png";
import Logo from "../components/Logo";

const HomePage = () => {
    return (
        <div className="instructions overflow-auto h-full">
            <h1>Welcome adventurer! 👋</h1>
            <p>
                It's dangerous to go alone. Take{" "}
                <a href="http://alpaca.code-red.si:12345/swagger-ui/index.html" target="_blank">
                    this
                </a>
                .
            </p>
            <p>
                Pred tabo je kratek tehnični test znanja. Nič skritih trikov, brez{" "}
                <i>
                    "joj, tu bi pa vseeno pričakovali uporabo hudo nišnega optimizacijskega
                    algoritma"
                </i>
                , ampak samo preprosto spoznavanje kako se lotiš reševanja problemov.
            </p>
            <h2>Projekt</h2>
            <p>
                Zate smo pripravili osnovni routing projekta in Navbar, ki ti olajša prehajanje med
                stranmi.
            </p>
            <p>
                V <span className="code">src/pages</span> boš našel 4 strani:
            </p>
            <ul>
                <li>
                    <span className="code">HomePage.tsx</span> - Stran, ki jo pravkar gledaš,
                </li>
                <li>
                    <span className="code">UsersPage.tsx</span> - Stran, kjer boš ti implementiral/a{" "}
                    <b>prikaz</b> uporabnikov aplikacije,
                </li>
                <li>
                    <span className="code">PostsPage.tsx</span> - Stran, kjer boš ti implementiral/a{" "}
                    <b>prikaz, dodajanje in brisanje</b> objav,
                </li>
                <li>
                    <span className="code">EventsPage.tsx</span> - Stran, kjer boš ti
                    implementiral/a <b>prikaz, dodajanje in brisanje</b> dogodkov,
                </li>
            </ul>
            <p>Pričakujemo, da boš strani strani razdelil/a na dve polovici:</p>
            <ul>
                <li>
                    Na levi strani naj bodo prikazani podatki kot seznam - ter v primeru objav in
                    dogodkov naj ima vsaka entiteta možnost brisanja s klikom na
                    gumb/ikono/link/surprise us...
                </li>
                <li>
                    Na desni strani naj bo obrazec za dodajanje novih vsebin. (V primeru uporabnikov
                    tega obrazca ni).
                </li>
            </ul>
            <p className="font-bold">Kako pa naj izgleda vsebina (podatki entitet)?</p>
            <p>
                Preprosto. Ne kompliciraj. Naj se jasno vidi, kaj spada skupaj in kaj ne. Če
                potrebuješ inspiracijo, ti ponudimo naš simple example:
            </p>
            <img src={example} alt="Example" style={{ maxHeight: "300px", margin: "1rem" }} />
            <h2>API</h2>
            <p>
                Na naslovu <span className="code">http://alpaca.code-red.si:12345/</span> teče
                zaledna aplikacija, ki vam s pomočjo programskega vmesnika opisanega v{" "}
                <a href="http://alpaca.code-red.si:12345/swagger-ui/index.html" target="_blank">
                    Swagger UI
                </a>{" "}
                <span className="code">http://alpaca.code-red.si:12345/swagger-ui/index.html</span>{" "}
                omogoča pridobivanje, hranjenje in brisanje omenjenih vsebin, ki jih boš
                implementiral/a.
            </p>
            <p>
                Za večino http klicev boš potreboval <b className="code">tenantId</b>, ki ti je bil
                posredovan s tem projektom.
            </p>
            <h2>Česa ne počet</h2>
            Prosim,
            <ul>
                <li>ne izgubljaj časa z minornimi detajli</li>
                <li>
                    ne pretiravaj z olepševanjem komponent. Komponente naj bodo funkcionalne in
                    pregledne. To je dovolj.
                </li>
                <li>ne ddosat serverja, prosim </li>
                <li>ne jemlji tega Page-a kot vzor za implementacijo ostalih Page-ov 😊</li>
            </ul>
            <h2>Knjižnice</h2>
            <p>
                Po želji lahko seveda dodaš in uporabiš poljubne knjižnice. Dodali smo že{" "}
                <span className="code">tailwind css</span> - če ga boš uporabil/a ali ne pa je čisto
                tvoja osebna preferenca.
            </p>
            <p className="mt-8 italic">Obilo sreče</p>
            <Logo />
        </div>
    );
};

export default HomePage;
