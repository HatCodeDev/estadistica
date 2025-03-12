import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import DataInput from "../components/DataInput";
import SortingStep from "../components/SortingStep";
import SturgesRule from "../components/SturgesRule";
import IntervalsStep from "../components/IntervalsStep";
import FrequencyTable from "../components/FrequencyTable";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Haz&nbsp;</span>
          <span className={title({ color: "violet" })}>Tablas de frecuencia&nbsp;</span>
          <br />
          <span className={title()}>
            automaticamente con tus datos
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Solamente pasa tus datos y obtén una tabla de frecuencia de datos agrupados en segundos.
          </div>
        </div>

        {/* <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div> */}

        {/* <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div> */}
        <DataInput />
        <SortingStep />
        <div className="flex flex-col md:flex-row gap-6"> 
          <SturgesRule />
          <IntervalsStep />
        </div>
        <FrequencyTable />
      </section>
      
    </DefaultLayout>
  );
}
