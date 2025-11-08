import {arrow, FloatingPortal, type Placement, useFloating} from "@floating-ui/react-dom-interactions";
import {AnimatePresence, motion} from "framer-motion";
import {type ElementType, type ReactNode, useId, useRef, useState} from "react";

interface Props{
  children:ReactNode;
  renderPopover: ReactNode;
  className?: string;
  as?: ElementType;
  initialOpen?: boolean;
  placement?: Placement;
}
function Popover({children, initialOpen, placement = 'bottom-end', as: Element = 'div', renderPopover}: Props) {
  const arrowRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(initialOpen || false);
  const {x,y, reference, floating, middlewareData, strategy} = useFloating({
    middleware: [arrow({element: arrowRef})],
    placement: placement
  });
  const showPopover = () => {
    setOpen(true);
  }

  const hidePopover = () => {
    setOpen(false);
  }

  const id = useId();

  return (
    <Element className="flex items-center py-1 hover:text-gray-300 cursor-pointer" ref={reference}
         onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{opacity: 0, transform: 'scale(0)'}}
              animate={{opacity: 1, transform: 'scale(1)'}}
              exit={{opacity: 0, transform: 'scale(0)'}}
              transition={{duration: 0.2}}
            >
              <span ref={arrowRef}
                      className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute -translate-y-full'
                      style={{
                        left: middlewareData.arrow?.x,
                        top: middlewareData.arrow?.y
              }}/>
              {renderPopover}
            </motion.div>
          )})
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  );
}

export default Popover;