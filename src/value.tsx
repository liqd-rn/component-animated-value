import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Ref } from '@liqd-rn/state';

import { toNumber, childrenToText } from './helpers';

export type AnimatedValueProps =
{
    children: React.ReactNode[]
}

export default function AnimatedValue({ children }: AnimatedValueProps )
{
    const [ text, setText ] = useState<string>( childrenToText( children ));

    const animation = Ref.use(
    {
        from        : toNumber( text ),
        to          : toNumber( text ),
        start       : 0,
        duration    : 750
    });

    const render = () =>
    {
        const progress = Math.max( 0, Math.min( 1, ( Date.now() - animation.start ) / animation.duration ));

        setText(( animation.from + ( animation.to - animation.from ) * progress ).toFixed( 0 ));

        if( progress < 1 )
        {
            setTimeout( render, 16 );
        }
    }

    const animate = ( to: number ) =>
    {
        animation.from = animation.to;
        animation.to = to;
        animation.start = Date.now();

        render();
    }

    useEffect(() => 
    {
        console.log( 'children changed' );

        const newText = childrenToText( children );

        //setText( newText );
        animate( toNumber( newText ));
    },
    [ children ]);

    return (
        <View>
            <Text>{ text }</Text>
        </View>
    );
}