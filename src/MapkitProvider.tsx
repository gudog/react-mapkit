/* global mapkit */

import React from 'react'

type MapkitContextType = {
  isInProvider: boolean
  mapkit: typeof mapkit | undefined
}

export const MapkitContext = React.createContext<MapkitContextType>({
  isInProvider: false,
  mapkit: undefined,
})

type ProviderProps = {
  // ⚠️ Pick between callbackUrl or token.
  // https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init
  tokenOrCallback: string
  language?: string
}

export const MapkitProvider: React.FC<ProviderProps> = ({
  tokenOrCallback,
  language,
  children,
}) => {
  const existingContext = React.useContext(MapkitContext)

  const [context, setContext] = React.useState<MapkitContextType>({
    mapkit: existingContext.mapkit,
    isInProvider: true,
  })

  React.useEffect(() => {
    if (!existingContext.isInProvider) {
        let script = document.createElement("script");

        // https://developer.apple.com/documentation/mapkitjs/loading_the_latest_version_of_mapkit_js
        script.src = "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js";
        script.async = true;
        script.crossOrigin = "anonymous";
        script.setAttribute("data-callback", "initMapKit");
        script.setAttribute("data-libraries", "full-map");

        const onScriptLoad = () => {
          const isCallback = tokenOrCallback.includes('/')
  
          // init mapkit
          mapkit.init({
            authorizationCallback: (done) => {
              if (isCallback) {
                fetch(tokenOrCallback)
                  .then((res) => res.text())
                  .then(done)
              } else {
                done(tokenOrCallback)
              }
            },
            language,
          })
          setContext({ mapkit, isInProvider: true })
        }

        const onScriptError = () => {console.log("Mapkit load error")}

        script.addEventListener("load", onScriptLoad);
        script.addEventListener("error", onScriptError);

        document.body.appendChild(script);

        return () => {
          script.removeEventListener("load", onScriptLoad);
          script.removeEventListener("error", onScriptError);
        };
    }
  }, [existingContext.isInProvider, tokenOrCallback, language])

  return <MapkitContext.Provider value={context} children={children} />
}
