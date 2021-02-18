import React, { ReactElement, useMemo, useState } from 'react';

interface Props {
    children: ReactElement[] | ReactElement;
    propsOnEvent?: { [key: string]: any; };
    className?: string;
    component?: ReactElement;
    events?: [string, string][];
}

export function OnEvent(
    {
        children,
        propsOnEvent,
        className,
        component,
        events,
    }: Props,
): ReactElement {
    const childList: ReactElement[] = Array.isArray(children) ? children : [children];

    const [isActive, setIsActive] = useState<number[]>([]);
    const getBasicProps = (e: number) => ({
        ...Object.fromEntries(
            (events || [['onMouseOver', 'onMouseOut']])
                .map(E =>
                    [
                        [E[0], () => setIsActive([...Array.from(new Set(isActive)), e])],
                        [E[1], () => setIsActive(isActive.filter(q => q !== e))],
                    ],
                )
                .flat(),
        ),
        key: e,
    });

    const newPropsOnEvent = useMemo(() => {
        const newProps: object[] = [];
        childList.forEach((e, i) => {
            const thisChild = getBasicProps(i) as any;

            Object.keys({ ...e.props, ...propsOnEvent }).forEach((k) => {
                if (!propsOnEvent?.hasOwnProperty(k)) {
                    thisChild[k] = e.props[k];
                } else if (typeof propsOnEvent[k] === 'object') {
                    if (Array.isArray(propsOnEvent[k])) {
                        thisChild[k] = propsOnEvent ? propsOnEvent[k] : undefined;
                    } else {
                        thisChild[k] = {
                            ...(e.props[k] || {}),
                            ...propsOnEvent ? propsOnEvent[k] : {},
                        };
                    }
                } else {
                    thisChild[k] = propsOnEvent ? propsOnEvent[k] : undefined;
                }
            });

            newProps.push(thisChild);
        });

        return newProps;
    }, [childList, propsOnEvent]);

    const currentChildren = useMemo(
        () =>
            childList.map((child, i) =>
                React.cloneElement(child, {
                    ...(
                        isActive.includes(i)
                        ? newPropsOnEvent[i]
                        : {
                                ...getBasicProps(i),
                                ...child.props,
                            }
                    ),
                    key: i,
                }),
            ),
        [childList, newPropsOnEvent, isActive],
    );

    const parent = useMemo(() => {
        if (component) {
            return React.cloneElement(
                component,
                {
                    children: currentChildren,
                    className,
                },
            );
        }

        return undefined;
    }, [newPropsOnEvent, childList]);

    if (parent) {
        return parent;
    }

    if (className) {
        return (
            <div className={className}>
                {
                    currentChildren
                }
            </div>
        );
    }

    return (
        <>
            {
                currentChildren
            }
        </>
    );
}
