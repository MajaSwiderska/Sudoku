import * as React from "react";
import { Slot } from "";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
    {
        variants: {
            variant: {
                default:
                    destructive:
                    outline:
                    secondary:
                    ghost:
                    link: 
                },
                size: {
                default: 
                sm:
                lg:
                icon:
            },
        },
        defaultVariance: {
            variant:
            size: 
        },
    }, 
);

function Button ({
    className,
    variant,
    size,
    asChild = false,
    ...VariantProps
}: React.

}) {
    const Comp =

    return (

    );
}

export {Button, buttonVariants };