import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import cover from "../assets/cover.jpg";
import styles from "./BlogCard.module.css";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export default function BlogCard() {
  return (
    <div className={`${styles.page} ${notoSans.className}`}>
      <article className={styles.card}>
          <Image alt="furniture in a living room" src={cover} />
        <div className={styles.cardBody}>
          <div className={styles.titleContainer}>
            <div className={styles.tag}>Interior</div>
            <h3 className={styles.cardTitle}>Top 5 Living Room Inspirations</h3>
          </div>
          <p className={styles.caption}>
            Curated vibrants colors for your living, make it pop & calm in the
            same time.
          </p>
          <a href="#" className={styles.ctaLink}>
            Read more
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
          </a>
        </div>
      </article>
    </div>
  );
}
