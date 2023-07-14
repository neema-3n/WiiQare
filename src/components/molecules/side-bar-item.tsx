import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface Menu {
  icon: string;
  title: string;
  href: string;
  submenu: any[];

}


function MenuItem(props: Menu) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <li>

      {props.submenu ? (

        <div>
          <Accordion sx={{
            border: 'none',
            boxShadow: 'none',
            background: 'none',
          }} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="hover:bg-[#FF8A2B]"
            >
              <Typography className=" text-black dark:text-white flex">
                <props.icon />
                <span className="ml-2">{props.title}</span>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {   props.submenu.map((submenu) => (
              <div key={submenu.title} className="mt-2 ml-3">
                <Link
                  href={submenu.href}
                  className={`relative flex gap-2 rounded items-center py-3 px-4 ${router.route == submenu.href
                    ? "button-text bg-[#FF8A2B] dark:bg-[#df690a] !opacity-100"
                    : "opacity-75 hover:bg-[#FF8A2B]"
                    }`}
                >
                  {router.route == submenu.href && (
                    <span className="absolute left-0 top-1/2 h-9 w-[6px] -translate-y-1/2 rounded bg-white"></span>
                  )}
                  <submenu.icon />
                  {submenu.title}
                </Link>
              </div>
            ))}
            </AccordionDetails>
          </Accordion>



        </div>)
        : <Link

          href={props.href}
          className={`relative flex gap-2 rounded items-center py-3 px-4 ${router.route == props.href
            ? "button-text bg-[#FF8A2B] dark:bg-[#df690a]"
            : " hover:bg-[#FF8A2B]"
            }`}
        >
          {router.route == props.href && (
            <span className="absolute left-0 top-1/2 h-9 w-[6px] -translate-y-1/2 rounded bg-white"></span>
          )}
          <props.icon />
          {props.title}
        </Link>
      }



    </li >
  );
}

export default MenuItem;