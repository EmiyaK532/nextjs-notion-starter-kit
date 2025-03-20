import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

interface SheetDemoProps {
    label: string;
    className?: string;
    onSubmit: () => void;
}

export function SheetDemo(props: SheetDemoProps) {
    const { label, className, onSubmit } = props;
    return (
        <div className={className}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">{label}</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>编写简介</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                名称
                            </Label>
                            <Input
                                id="name"
                                value="HOWHITE"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                签名
                            </Label>
                            <Input
                                id="username"
                                value="Hello World"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" onClick={onSubmit}>
                                保存
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
