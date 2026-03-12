interface HeaderProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

export default function Header({ title = "Latest",  }: HeaderProps) {
    return(
        
            <h1 className="text-3xl font-bold font-poppins mb-8">
                {title}
            </h1>
            
    )
}