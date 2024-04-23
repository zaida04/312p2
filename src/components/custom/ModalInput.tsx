import { Input } from "../ui/input";
import { Label } from "../ui/label";

export interface ModalInputProps extends React.ComponentProps<typeof Input> {
    label: string;
    error?: string;
}

export default function ModalInput(
    { label, error, ...rest }: ModalInputProps
) {
    return <div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={rest.id} className="text-right">
                {label}
            </Label>
            <Input className="col-span-3" {...rest} />
        </div>
        <p className="text-xs text-red-500 text-right pt-1">{error}</p>
    </div>
}