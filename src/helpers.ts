import React from 'react';

export function toNumber( value: string | number | undefined ): number
{
    if( typeof value === 'string' )
    {
        const number = parseFloat( value );

        if( !isNaN( number )){ return number }
    }

    return 0;
}

export function childrenToText( children: React.ReactNode[] ): string
{
    return React.Children.map( children, c => c?.toString() ?? '' )?.join('') ?? '';
}