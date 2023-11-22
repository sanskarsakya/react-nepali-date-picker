import { useMachine } from "@xstate/react"
import { mergedMachine } from "../../machines/date-picker-merged-machine"
import { Button, Code, Flex } from "@chakra-ui/react"
import React from "react"

interface SampleMachineProps {
    isNepali: boolean
}
export const SampleMachine = (props: SampleMachineProps) => {
    const [state, send] = useMachine(mergedMachine)

    React.useEffect(() => {
        send("on_mount", {
            data: props
        })
    }, [send])

    React.useEffect(() => {
        send("on_props_change", {
            data: { ...props }
        })
    }, [props, send])

    const handleChangeProps = () => {
        send("on_props_change", {
            data: {
                isNepali: false,
            }
        })
    }

    return (
        <>
            <Flex gap={2}>
                <Button onClick={handleChangeProps}>Change Props</Button>
                <Button>Mount</Button>
            </Flex>
            <Code>{JSON.stringify(state.value)}</Code>
        </>
    )
}
