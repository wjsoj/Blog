export default function FormattedDate({ date,className }) {
	return (
		<time datetime={date.toISOString()} className={className}>
			{
				date.toLocaleDateString('zh-cn', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				})
			}
		</time>
	)
}